/**
 * Copyright (c) Piwik PRO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function FormField({ value, type, onChange, name, id, ...options }) {
  switch (type) {
    case 'boolean':
      return (
        <>
          <input id={id} name={name} type="checkbox" onChange={() => onChange({
            target: {
              name,
              value: !value,
            }
          })} checked={value} />
        </>
      )
    case 'text':
      return (
        <>
          <input 
            id={id}
            className={styles.input}
            name={name}
            type="text"
            onChange={onChange}
            value={value}
            {...(options.choices ? { list: `${id}-choices` } : {})}
          />
          {options.choices && (
            <datalist id={`${id}-choices`}>
              {options.choices.map(choice => (
                <option key={choice} value={choice} />
              ))}
            </datalist>
          )}
        </>
      )
    case 'number':
      return (
        <>
          <input name={name} id={id} className={styles.input} type="number" onChange={onChange} value={value} />
        </>
      )
    default:
      return null;
  }
}

function SnippetForm({ args, values, onChange }) {

  const handleChange = (evt) => {    
    onChange({
      ...values,
      [evt.target.name]: evt.target.value,
    })
  }



  return (
    <div className={styles.generatorForm}>
      {args.map(arg => {
        const { id, type, displayName, description, ...additionalProps } = arg;

        return (
          <div className={styles.annotatedLayout}>
            <div className={styles.annotatedLayoutLabel}>
              <h3>{arg.displayName}</h3>
              <div>{arg.description}</div>
            </div>
            <div className={styles.annotatedLayoutBody}>
              <FormField id={arg.id} name={arg.id} type={arg.type} value={values[arg.id]} onChange={handleChange} {...additionalProps}  />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SnippetGenerator({ template }) {
  const [customize, showCustomizeForm] = useState(false)
  const [snippet, updateSnippet] = useState('')
  const [values, updateValues] = useState(template.arguments.reduce((acc, arg) => {
    acc[arg.id] = arg.default

    return acc
  }, {}))

  useEffect(() => {
    const tpl = values.iife ? `(function () {${template.template}})();` : template.template

    updateSnippet(Object.entries(values).reduce((acc, [key, val]) => {
      return acc.replace(`{{${key}}}`, val)
    }, tpl))
  }, [values])

  return (
    <div className={styles.generator}>
      <h2 className={styles.cardHeading}>{template.name}</h2>
      {template.beforeDescriptionNote && <p className={styles.cardDescription} dangerouslySetInnerHTML={{__html: template.beforeDescriptionNote}} />}
      <p className={styles.cardDescription}>{template.description}</p>
      {customize && <SnippetForm args={template.arguments} values={values} onChange={updateValues} />}
      <div className={styles.snippetWrapper}>
        <button type="button" className={styles.customizeButton} onClick={showCustomizeForm}>Customize</button>
        <CodeBlock className="language-js">{snippet}</CodeBlock>
      </div>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        <section>
          <div className="container">
            <div className={`row ${styles.generatorRow}`}>
              {siteConfig.themeConfig.generator.templates.map(tpl => (
                <SnippetGenerator 
                  key={tpl.id} 
                  template={{
                    ...tpl, 
                    arguments: [
                      ...tpl.arguments, 
                      ...siteConfig.themeConfig.generator.arguments
                    ]
                  }} 
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;

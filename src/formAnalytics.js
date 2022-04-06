'use strict';

import {stringify} from "ts-jest/dist/utils/json";

/**
 * Form analytics
 *
 * This script sends events for <form> fields interactions that are used in form analytics reports.
 */
function PPFormAnalytics(formId, target, dimensionMap, sendData, fieldLabelMap) {
  const category = 'formTracking',
    formInputTags = ['INPUT', 'TEXTAREA', 'SELECT'],
    storageName = 'PPFA-' + formId,
    storageNameFormTime = storageName + '-form',
    storageNameLastField = storageName + '-field',
    fields = {},
    delay = 1000,
    lastSentEvent = {
      timestamp: 0,
      eventType: null,
      fieldType: null,
      fieldName: null,
      fieldLabel: null,
      message: null
    };

  const setFormStartTime = value => {
    formStartTime = value;
    sessionStorage.setItem(storageNameFormTime, JSON.stringify(value));
  };

  const getFormStartTime = () => {
    const value = sessionStorage.getItem(storageNameFormTime);

    if (value) {
      formStartTime = JSON.parse(value);
    }

    return formStartTime || null;
  };

  const resetFormStartTime = () => {
    formStartTime = null;
    sessionStorage.removeItem(storageNameFormTime);
  };

  const setFormLastField = value => {
    sessionStorage.setItem(storageNameLastField, JSON.stringify(value));

  };

  const getFormLastField = () => {
    let value = sessionStorage.getItem(storageNameLastField);

    if (value) {
      return JSON.parse(value);
    }

    return value || {};
  };

  const resetFormLastField = () => {
    sessionStorage.removeItem(storageNameLastField);
  };

  const isFormInput = (element) => {
    return formInputTags.includes(element.tagName);
  };

  const addFormInputEventListener = (type, listener) => {
    target.addEventListener(type, (ev) => {
      if (isFormInput(ev.target)) {
        listener(ev);
      }
    });
  };

  const getFieldType = element => {
    const tag = element.tagName;
    if (tag === 'INPUT') {
      return element.getAttribute('type') || 'text';
    }
    return tag;
  };

  const getLabel = element => {
    let label = fieldLabelMap[element.getAttribute('name') || ''],
      id = element.getAttribute('id');

    if (label) return label;

    if (id) {
       label = target.querySelector('label[for="' + id + '"]');
    }

    if (!label) {
       label = element.closest('label');
    }

    if (!label) {
      label = element.getAttribute('value');
    }

    if (label) return label.textContent.trim();

    return '';
  };

  const getFieldData = element => ({
    fieldType: getFieldType(element),
    fieldName: element.getAttribute('name') || element.getAttribute('value'),
    fieldLabel: getLabel(element),
  });

  let formStartTime = getFormStartTime();

  const sendPiwikEvent = (eventType, fieldType, fieldName, fieldLabel, message) => {
    let dimensionName,
      lastTouchedFiled,
      dimensions = {},
      value = 0;
    const lastFormStartTime = getFormStartTime(), now = +new Date();

    if (now - lastSentEvent.timestamp < delay
      && eventType === lastSentEvent.eventType
      && fieldType === lastSentEvent.fieldType
      && fieldName === lastSentEvent.fieldName
      && fieldLabel === lastSentEvent.fieldLabel
      && message === lastSentEvent.message
    ) {
      // Ignore spam of same event types
      return;
    }
    lastSentEvent.timestamp = now;
    lastSentEvent.eventType = eventType;
    lastSentEvent.fieldType = fieldType;
    lastSentEvent.fieldName = fieldName;
    lastSentEvent.fieldLabel = fieldLabel;
    lastSentEvent.message = message;

    switch (eventType) {
      case PPFormAnalytics.event.FormView:
        if (lastFormStartTime > 0) {
          // No form view for continuation
          return;
        }
        dimensionName = 'formView';
        break;
      case PPFormAnalytics.event.FormComplete:
        dimensionName = 'formComplete';

        if (lastFormStartTime > 0) {
          value = now - lastFormStartTime;
        } else {
          value = 0;
        }

        resetFormStartTime();
        resetFormLastField();
        break;
      case PPFormAnalytics.event.Click:
      case PPFormAnalytics.event.Input:
      case PPFormAnalytics.event.Change:
        lastTouchedFiled = getFormLastField();
        if (lastTouchedFiled.name === undefined && !lastFormStartTime) {
          dimensionName = 'formStarted';
          setFormStartTime(now);
          sendData(['trackEvent', category, 'formStarted', formId]);
        }

        if (lastTouchedFiled.name !== fieldName) {
          setFormLastField({name: fieldName, label: fieldLabel});
          fields[fieldName] = fields[fieldName] || {};
          fields[fieldName].lastEventTime = now;
        }

        value = now - fields[fieldName].lastEventTime;
        fields[fieldName].lastEventTime = now;
        break;
      default:
        break;
    }

    if (fieldType === 'password') {
      return;
    } else if (fieldType !== undefined) {
      dimensions = {
        [dimensionMap.fieldType]: fieldType,
        [dimensionMap.fieldName]: fieldName,
        [dimensionMap.fieldLabel]: fieldLabel || fieldName,
        [dimensionMap.fieldMessage]: message
      };
    }

    if (dimensionName) {
      dimensions[dimensionMap[dimensionName]] = '1';
    }

    sendData(['trackEvent', category, eventType, formId, value, dimensions]);
  };

  this.sendEvent = function sendEvent(eventType, element, message) {
    let field, onunload;

    switch (eventType) {
      case PPFormAnalytics.event.FormView:
        addFormInputEventListener('click', (ev) => {
          sendEvent(PPFormAnalytics.event.Click, ev.target);
        });
        addFormInputEventListener('input', (ev) => {
          sendEvent(PPFormAnalytics.event.Input, ev.target);
        });
        addFormInputEventListener('change', (ev) => {
          sendEvent(PPFormAnalytics.event.Change, ev.target);
        });

        // Abandoned form event start
        onunload = () => {
          const lastTouchedFiled = getFormLastField();
          if (lastTouchedFiled.name !== undefined || getFormStartTime() > 0) {
            sendData(['trackEvent', category, 'formAbandoned', formId, +new Date() - getFormStartTime(), {
              [dimensionMap.formLastField]: lastTouchedFiled.name,
              [dimensionMap.formLastFieldLabel]: lastTouchedFiled.label
            }]);
            resetFormStartTime();
            resetFormLastField();
          }
        };

        window.addEventListener('beforeunload', onunload);
        target.querySelector('form').addEventListener('submit', () => {
          window.removeEventListener('beforeunload', onunload);
        });
        // Abandoned form event stop

        sendPiwikEvent(PPFormAnalytics.event.FormView);
        break;
      case PPFormAnalytics.event.FormComplete:
        sendPiwikEvent(PPFormAnalytics.event.FormComplete);
        break;
      case PPFormAnalytics.event.Click:
      case PPFormAnalytics.event.Input:
      case PPFormAnalytics.event.Change:
      case PPFormAnalytics.event.Error:
        field = getFieldData(element);
        sendPiwikEvent(eventType, field.fieldType || '', field.fieldName || '', field.fieldLabel || '', message || '');
        break;
    }
  };
}

PPFormAnalytics.event = {
  FormView: 'formView',
  FormComplete: 'formComplete',
  Click: 'click',
  Input: 'input',
  Change: 'change',
  Error: 'error'
};

export default PPFormAnalytics;

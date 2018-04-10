//Events
const ARG_OPEN_PAGE = 'notificationNum';
const ARG_SWIPE = 'swipe';
const ARG_CTA = 'CTA';
const ARG_GO_TO_STORE = "gotostoreRating";
const ARG_DECLINE = "declineRating";
//Atributes
const ARG_NOTIFICATION_NUM = 'notificationNum';
const ARG_PAGE_NUM = 'pageNum';
const ARG_DEEPLINK = 'deeplink';
const ARGS_ATRIBUTES_ARRAY = [ARG_NOTIFICATION_NUM, ARG_PAGE_NUM, ARG_DEEPLINK];

function logEvent(name, params) {
  if (!name) {
    return;
  }

  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(name, JSON.stringify(formatParamsForAndroid(params)));
  } else if (window.webkit
      && window.webkit.messageHandlers
      && window.webkit.messageHandlers.firebase) {
    // Call iOS interface
    var message = {
      command: 'logEvent',
      name: name,
      parameters: params
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
}

function formatParamsForAndroid(params) {
  var paramsArray = [];

  for (var i = 0; i < ARGS_ATRIBUTES_ARRAY.length; i++) {
    if ([ARGS_ATRIBUTES_ARRAY[i]] in params) {
      paramsArray.push({[ARGS_ATRIBUTES_ARRAY[i]]: params[ARGS_ATRIBUTES_ARRAY[i]]});
    }
  }

  return paramsArray;
}
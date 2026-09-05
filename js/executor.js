// This file will be injected
(function() {
  var s = "document.title='123'";
  // Use Function constructor or eval here - it will run in the page context
  const result = new Function(s)();
  // Send result back
  return result;
})();


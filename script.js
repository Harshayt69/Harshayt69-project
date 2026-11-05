
const form = document.getElementById('openForm');
const field = document.getElementById('url');
const message = document.getElementById('message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let value = field.value.trim();
  if (!value) return;

  if (!/^https?:\/\//i.test(value)) {
    value = 'https://' + value;
  }

  let parsed;

  try {
    parsed = new URL(value);
  } catch {
    message.textContent = 'Please enter a valid website address.';
    return;
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    message.textContent = 'Please use an http or https website address.';
    return;
  }

  const blankTab = window.open('about:blank', '_blank');

  if (!blankTab) {
    message.textContent = 'Your browser blocked the new tab. Allow pop-ups and try again.';
    return;
  }

  blankTab.document.title = 'Website Preview';

  const frame = blankTab.document.createElement('iframe');
  frame.src = parsed.href;
  frame.title = 'Website preview';
  frame.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;border:0;background:white';

  blankTab.document.body.style.cssText = 'margin:0;overflow:hidden';
  blankTab.document.body.appendChild(frame);

  message.textContent = 'Opened a new blank tab.';
});

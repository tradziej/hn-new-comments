import chromeStorage from '../../utils/storage';

const loadOptions = () => {
  chrome.runtime.sendMessage({ action: 'GET_SETTINGS' }, options => {
    document.stylingSettings.kind.value = options.styleSettings;
    document.getElementById('color').value = options.colorSettings;
  });
};

const saveOptions = () => {
  const color = document.getElementById('color').value;
  const style = document.stylingSettings.kind.value;

  chromeStorage.set(
    {
      styleSettings: style,
      colorSettings: color,
    },
    () => {
      const status = document.getElementById('status');
      status.textContent = 'Options saved';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    }
  );
};

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);

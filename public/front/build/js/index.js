let deferredPrompt;

const installApp = document.getElementById('installApp');
const content = document.getElementById('content-install');

function closeButtonInstall(event) {
  if (event) {
    event.preventDefault();
  }
  content.style.display = 'none';
}

window.addEventListener('beforeinstallprompt', (e) => {
  content.style.display = 'flex';
  deferredPrompt = e;
});

installApp.addEventListener('click', async () => {
  if (deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
    }
    closeButtonInstall();
  }
});

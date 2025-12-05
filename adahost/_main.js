// ########## 
import "./_main.scss";

// Chess UI: chessground + chess.js
import { Chessground } from 'chessground'
// chessground ships a few CSS themes in its `assets/` folder. import the base theme.
import 'chessground/assets/chessground.base.css'
import { Chess } from 'chess.js'
// ############ dark mode (ChatGPT)
const darkToggleBtn = document.getElementById('toggle-dark');

// Initialize a basic chess board (Chessground) and a Chess state (chess.js)
function initMainBoard() {
  // Ensure a mount point exists
  let boardEl = document.getElementById('mainboard');
  if (!boardEl) {
    boardEl = document.createElement('div');
    boardEl.id = 'mainboard';
    boardEl.className = 'box mb-4';
    boardEl.style.maxWidth = '480px';
    boardEl.style.margin = '0 auto';
    const container = document.querySelector('.container') || document.body;
    // place after the top-level hero if possible
    const hero = container.querySelector('.hero');
    if (hero && hero.parentNode) hero.parentNode.insertBefore(boardEl, hero.nextSibling);
    else container.insertBefore(boardEl, container.firstChild);
  }

  // chess.js game state
  const chess = new Chess();

  // initialize chessground
  const cg = Chessground(boardEl, {
    fen: chess.fen(),
    orientation: 'white',
    movable: {
      free: false,
      color: 'both'
    },
    animation: { enabled: true }
  });

  // expose minimal handles for later puzzle wiring and debugging
  window._chess = chess;
  window._cg = cg;

  // simple API: load a FEN into the board (no validation/logic yet)
  window.loadPuzzle = (fen = 'start') => {
    try {
      if (fen === 'start') chess.reset();
      else chess.load(fen);
      cg.set({ fen: chess.fen() });
    } catch (err) {
      console.error('loadPuzzle error', err);
    }
  };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMainBoard);
else initMainBoard();
function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  localStorage.setItem('darkmode', dark ? '1' : '0');
}

if (localStorage.getItem('darkmode') === '1') {
  applyTheme(true);
}

darkToggleBtn?.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  applyTheme(!isDark);
});

// ############ klavye kısayolları
// H: Home, L: Login

document.addEventListener('keydown', (e) => {
  if (e.key === 'h') window.location.href = '/';
  if (e.key === 'l') window.location.href = '/login.html';
});

// ########## https://bulma.io/documentation/components/navbar/
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });


// ############ https://bulma.io/documentation/components/message/
 function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days*864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }

  function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (getCookie('siteCookieNotice') === 'dismissed') {
      const el = document.querySelector('.notification.is-info.is-light');
      if (el) el.remove();
      return;
    }

    (document.querySelectorAll('.notification .delete') || []).forEach($delete => {
      const $notification = $delete.parentNode;
      console.log('Found delete button:', $delete);

      $delete.addEventListener('click', () => {
        console.log('Clicked delete');
        setCookie('siteCookieNotice', 'dismissed', 365);
        $notification.remove();
      });
    });
  });

// ############ https://bulma.io/documentation/components/modal/
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeAllModals();
    }
  });
});

// ############ Session Management
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const settingsBtn = document.getElementById('settings-btn');
    
    const userEmail = localStorage.getItem('user_email');
    
    if (userEmail) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'flex'; // Bulma buttons are flex by default usually, or inline-flex
        if (settingsBtn) settingsBtn.style.display = 'flex';
        
        // Handle logout
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user_email');
            window.location.reload();
        });
    } else {
        // User is logged out
        if (loginBtn) loginBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (settingsBtn) settingsBtn.style.display = 'none';
    }
});
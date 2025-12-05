// ########## 
import "./_main.scss";


// ############ dark mode (ChatGPT)
const darkToggleBtn = document.getElementById('toggle-dark');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  localStorage.setItem('darkmode', dark ? '1' : '0');
}

// load saved theme
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

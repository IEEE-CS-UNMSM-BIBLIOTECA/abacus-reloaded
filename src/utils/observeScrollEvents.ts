const setScrollClasses = (el: HTMLElement) => {
  const isScrollable = el.scrollHeight > el.clientHeight;

  if (!isScrollable) {
    el.classList.remove('is-bottom-overflowing', 'is-top-overflowing');
    return;
  }

  const isScrolledToBottom = el.scrollHeight < el.clientHeight + el.scrollTop + 1;
  const isScrolledToTop = isScrolledToBottom ? false : el.scrollTop === 0;

  el.classList.toggle('is-bottom-overflowing', !isScrolledToBottom);
  el.classList.toggle('is-top-overflowing', !isScrolledToTop);
};

const handleScroll = (e: Event) => {
  const el = e.currentTarget;
  if (el instanceof HTMLElement) {
    setScrollClasses(el);
  }
};

const addScrollListeners = () => {
  const elements = document.querySelectorAll('.vertical-scroll');
  elements.forEach((el) => {
    // if (!el.classList.contains('is-bottom-overflowing')) {
    //   el.classList.add('is-bottom-overflowing');
    // }
    if (el instanceof HTMLElement) {
      setScrollClasses(el);
    }
    el.addEventListener('scroll', handleScroll);
  });
};

export default () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        addScrollListeners();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });

  return () => {
    observer.disconnect();
    const elements = document.querySelectorAll('.vertical-scroll');
    elements.forEach((element) => {
      element.removeEventListener('scroll', handleScroll);
    });
  };
};

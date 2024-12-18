
import ReactGA from 'react-ga4';

export const trackButtonClick = (buttonName) => {
  ReactGA.event({
    category: 'Button',
    action: 'Click',
    label: buttonName,
  });
};
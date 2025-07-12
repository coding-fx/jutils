/** 
* The Jutils foundation 
* Version: jutils_v1-3 
* Date: 7th of July 2025
 **/

/* Compare dates or perform date calculations. */
$.dateDiffs = function(first, operator, second) {
  const operations = {
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '=': (a, b) => a === b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '!=': (a, b) => a !== b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  const getTimestamp = (date) => parseInt(date.toString().replace(/\D/g, ''));

  if (operator === undefined) {
    // Return the timestamp
    return getTimestamp(first);
  }

  if (second === undefined) {
    // Assume the second argument is a date string
    return getTimestamp(first) > getTimestamp(operator);
  }

  if (!operations[operator]) {
    throw new Error(`Unsupported operator: ${operator}`);
  }

  return operations[operator](getTimestamp(first), getTimestamp(second));
}


/* Compare dates or perform date calculations. */
$.parseDate = function(first, operator, second) {
  const operations = {
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '=': (a, b) => a === b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '!=': (a, b) => a !== b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  const date1 = Date.parse(first);

  if (operator === undefined) {
    // Return the parsed date
    return date1;
  }

  if (second === undefined) {
    // Assume the second argument is a date string
    const date2 = Date.parse(operator);
    return date1 > date2;
  }

  if (!operations[operator]) {
    throw new Error(`Unsupported operator: ${operator}`);
  }

  const date2 = Date.parse(second);
  return operations[operator](date1, date2);
}


/* Get typeof data strictly for array checking */
$.type = function(value, types) {
if(arguments.length === 1) {
  if(typeof value === 'object') {
  return Array.isArray(value) ? 'array' : typeof value;
} else {
    return typeof value;
}
} else if (arguments.length === 2) {
    return Array.isArray(value) && types === 'array' ? true : typeof value === types && !Array.isArray(value);
  } else {
    throw new RangeError('type() require 1 or 2 argument!');
  }
 }
 

/* checking if a value is set not empty */
$.isset = function(element) {
  if(element !== null && typeof element !== 'undefined') {
   return true;  
  } else {
      return false;
  }
  }    


/* checking if a value is empty not set */
$.empty = function(value) {
if(arguments.length === 0 || arguments.length > 1) {
 throw new RangeError('isempty() require 1 argument!');  
}

  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim() === '') ||
    (typeof value === 'number' && isNaN(value)) ||
    (typeof value === 'boolean' && !value)
  );  
}


/* Dom manipulation function class */
class myJutils {
 constructor(element, all) {  
  if (all) {
    try {
      this.element = document.querySelectorAll(element);
      this.check = element;
    } catch {
      this.element = element;
      this.check = element;
    }
  } else {
    try {
      if (element.startsWith('<') && element.endsWith('>')) {
   const tyrs = document.createElement('div');
        tyrs.innerHTML = element;         
    return new myJutils(tyrs);   
      } else if (element.startsWith(':')) {
        const lisd = document.createElement(element.replace(':', ''));
        return new myJutils(lisd);
      } else {
        this.element = document.querySelector(element);
        this.check = element;
      }
    } catch {
      this.element = element;
      this.check = element;
    }
  }
}

 expose() {
 return this.element || this.check;
}
 
    at(index = 0) {  
 return new myJutils(this.element[index]);              
    }
   
   html(content) {
   if(content || content === '') {
this.element.innerHTML = content;    
return new myJutils(this.element);   
   } else {   
return this.element.innerHTML;      
   }    
   }

  text(content) {
   if(content || content === '') {
this.element.textContent = content;    
return new myJutils(this.element);   
   } else {
return this.element.textContent;      
   }    
   } 
   
   val(content) {
   if(content || content === '') {
this.element.value = content;    
return new myJutils(this.element);   
   } else {
return this.element.value;      
   }    
   }
  
 
 ready(callback) {
 if(this.element == document) {
document.addEventListener('DOMContentLoaded', callback);         
 } else if(this.element == window) {    
window.addEventListener('load', callback);
   } else if(this.check === 'online') {    
window.addEventListener('online', callback);
   } else if(this.check === 'offline') {    
window.addEventListener('offline', callback);
   } else if(this.check === 'onLine') {
 return navigator.onLine;            
   } else if(this.check === 'offLine') {
 return !navigator.onLine;            
   } 
}     


is(callback) {
try {
  if(callback.startsWith('#')) { 
    return this.element.getAttribute('id') === callback.replace('#', '').trim(); 
  }
  
  if(callback.startsWith('.')) { 
    return this.element.getAttribute('class') === callback.replace('.', '').trim(); 
  }
  
  if(callback === ':int') { 
    if(!isNaN(this.check)) { 
      return this.check % 1 === 0; 
    }
  }

  if(callback === ':float') { 
    if(!isNaN(this.check)) { 
      return this.check % 1 !== 0; 
    }
  }
  
  if(callback === ':even') { 
    return this.check % 2 === 0; 
  }

  if(callback === ':odd') { 
    return this.check % 2 !== 0; 
  }

  if(callback === ':negative') { 
    return this.check < 0; 
  }

  if(callback === ':positive') { 
    return this.check > 0; 
  }  

  if(callback === ':visible') { 
    return this.element.offsetParent !== null; 
  }

  if(callback === ':hidden') { 
    return this.element.offsetParent === null; 
  }

if(callback === ':nan') {
return isNaN(this.check);
}


/* check if element has been removed */
if(callback === ':removed') {
if(!this.element) {
return true;   
} else {
    return false;
}
}

/* check if element has attribute */
  if(callback.startsWith('[') && callback.endsWith(']')) { 
return this.element.hasAttribute(callback.replace('[', '').replace(']', ''));           
  }

/* check if html input field type is checked */
  if(callback === ':checked') { 
    return this.element.checked; 
  }


/* Get html attribute  */
  if(callback.includes('=')) { 
    const spt = callback.split('='); 
    return this.element.getAttribute(spt[0]) === spt[1]; 
  }
 
  
  /* Validate tag name */
  if(this.element.tagName === callback.toUpperCase() && !callback.includes('=')) { 
    return true; 
  } else { 
    return false; 
  }
} catch {
throw new TypeError('An is() method error occurred');     
}
  
  
}


/* loading icon based on duration */
loader(duration = 2000, options) {
  const defaults = {
    width: 40,
    height: 40,
    background: '#f3f3f3',
    foreground: '#3498db',
    radius: '70',
    stop: 100000000, // seconds
    callback: () => {
        
    }  
  };

  const settings = Object.assign(defaults, options);

  this.element.style.width = `${settings.width}px`;
  this.element.style.height = `${settings.height}px`;
  this.element.style.border = `${settings.bgShow || 5}px solid ${settings.background}`;
  this.element.style.borderTop = `${settings.foreWeight || 5}px solid ${settings.foreground}`;
  this.element.style.borderRadius = `${settings.radius}%`;
  this.element.style.animation = `spin ${duration / 1000}s linear infinite`;

  const stys = document.createElement('style');
  stys.innerHTML = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(stys);
  
  setTimeout(() => {
this.element.style.animation = 'none';
settings.callback(this);
}, settings.stop);  
};

    



css(styles, property) {
 if(styles && property) {
 this.element.style[styles] = property;  
 return new myJutils(this.element);
 } else {
  return this.element.style[styles];  
 }  
}


append(content) {
   this.element.append(content); 
}

prepend(content) {
   this.element.prepend(content); 
}



appendTo(content) {
if(content) {    
content.append(this.element);      
  } else {
 throw new RangeError('appendTo() required 1 argument!');     
  }
}

prependTo(content) {
if(content) {
content.prepend(this.element);    
} else {
throw new RangeError('prependTo() required 1 argument!');
}
  
}


alter() {
  return new myJutils(this.element.trim())
}


attr(first, second) {
 if(first && second) {
 this.element.setAttribute(first, second); 
 return new myJutils(this.element);  
 } else {
return this.element.getAttribute(first);     
 }  
}

removeAttr(first) {
if(first) {
   this.element.removeAttribute(first);  
} else {
 throw new RangeError('removeAttr() required 1 argument!');   
}
  
}


show(delay = 0) {
setTimeout(() => {   
   this.element.style.display = 'block';
   }, delay);  
   return new myJutils(this.element);
}

hide(delay = 0) {
setTimeout(() => {   
   this.element.style.display = 'none';
   }, delay);
   return new myJutils(this.element);
}

toggle(delay = 0) {
setTimeout(() => {   
  this.element.style.display = this.element.style.display === 'none' ? 'block' : 'none'
  }, delay);  
  return new myJutils(this.element);
}


addClass(style) {
this.element.classList.add(style);
   return new myJutils(this.element);   
}

removeClass(style) {
this.element.classList.remove(style);
   return new myJutils(this.element);   
}

toggleClass(style) {
this.element.classList.toggle(style);
   return new myJutils(this.element);   
}

hasClass(style) {
if(style) {
 return this.element.classList.contains(style);   
} else {
   throw new RangeError('hasClass() required 1 argument!');
}
}

prev() {
 return new myJutils(this.element.previousElementSibling); 
}


next() {
    return new myJutils(this.element.nextElementSibling);
}

child(index = 0) {
return new myJutils(this.element.children[index]);       
}

first() {
return new myJutils(this.element.firstElementChild);    
}

last() {
    return new myJutils(this.element.lastElementChild);
}

before(content) {
  this.element.insertAdjacentHTML('beforebegin', content);
  return this;
}

after(content) {
  this.element.insertAdjacentHTML('afterend', content);
  return this;
}

/* add EventListener dynamically */
on(type, callback) {
  if(type && !callback) {
  this.element.addEventListener('click', type);
  return type;
   } else {
  this.element.addEventListener(type, callback);
  return callback; 
} 
}

/* submit EventListener */
submit(type) {  
 this.element.addEventListener('submit', type);
    return type;
}


/* preventDefault form behavior */
pform() {
  this.check.preventDefault();
}


/* submit already prevent form */
sform() {
  this.element.submit();  
}

/* input EventListener */
input(type) {  
 this.element.addEventListener('input', type);
    return type;
}


/* focus EventListener */
focus(type) { 
if(typeof type === 'function') {
this.element.addEventListener('focus', type);
    return type;    
} 
this.element.focus();
}


/* blur EventListener */
blur(type) { 
if(typeof type === 'function') {
this.element.addEventListener('blur', type);
    return type;    
} 
 this.element.blur();        
}


/* Separate function count */
sepcount(separate = '/') {
const element = this.check;
return element.toString().split(separate).length - 1;     
}


/* click EventListener */
click(type) {
 this.element.addEventListener('click', type);
  return type;   
}


/* double click EventListener */
dblclick(type) {
this.element.addEventListener('dblclick', type);
  return type;    
}


/* remove EventListener from element */
off(type, callback) {
 this.element.removeEventListener(type, callback);        
}


/* blur filter html element */
blurEffect(index = '1px') {
  return this.element.style.filter = `blur(${index})`;  
}


/* change input type "password" to text or vice versa(password)  / or set */
itype(type) {
  if (type === undefined) {
    return this.element.type;
  }

  if (['password', 'text'].includes(type)) {
    this.element.type = type;
    return this.element.type; // Return the new type
  } else {
    console.warn(`Invalid type: ${type}. Toggling between 'password' and 'text'.`);
    this.element.type = this.element.type === 'password' ? 'text' : 'password';
    return this.element.type; // Return the new type
  }
}


/* progress bar */
progressBar(options) {
  const defaults = {
    width: 100,
    height: 10,
    background: 'yellow',
    foreground: 'green',
    duration: 10, // seconds
    borderRadius: '10px',
    callback: () => {
        
    }
  };

  const settings = Object.assign(defaults, options);

  this.element.style.width = `${settings.width}%`;
  this.element.style.height = `${settings.height}px`;
  this.element.style.backgroundColor = settings.background;
  this.element.style.borderRadius = settings.borderRadius;
  this.element.style.overflow = 'hidden';

  const progressBar = document.createElement('div');
  progressBar.style.width = '0%';
  progressBar.style.height = '100%';
  progressBar.style.backgroundColor = settings.foreground;
  progressBar.style.transition = `width ${settings.duration / 1000}s`;

  this.element.appendChild(progressBar);

  setTimeout(() => {
    progressBar.style.width = '100%';
  }, 1);
  
 setTimeout(() => {
settings.callback(this); 
 }, settings.duration); 
};


/* limit characters method */
limitChar(limit, callbacks) {
  let property;
  if (this.element.tagName !== 'INPUT' && this.element.tagName !== 'TEXTAREA') {
    property = 'textContent';
  } else {
    property = 'value';
  }
if(limit) {
    this.element.addEventListener('input', () => {
      const conth = this.element[property];
      this.element.setAttribute('yfds', conth.length);
      if (conth.length >= limit) {
        this.element[property] = conth.slice(0, limit);
    if(callbacks) callbacks (this.element[property].length);      
      }    
    });
  }

  return {
    queue: (callback) => {
      this.element.addEventListener('input', () => {
        const conth = this.element[property];
    if(callbacks) {
  throw new Error('Cannot use both callback');   
    }    
        if (limit && conth.length === limit) {
          callback(this.element[property].length);
        }
      });
      return this; // Return the object itself for chaining
    }
  };
}


// sliding down element based on duration 
slideDown(delay, callback) {
  const fit = delay / 1000;
  this.element.style.transition = `max-height ${fit}s ease-in-out`;
  this.element.style.overflow = 'hidden';
  this.element.style.maxHeight = '0px';
  const scrollHeight = this.element.scrollHeight;
  setTimeout(() => {
    this.element.style.maxHeight = `${scrollHeight}px`;
  }, 0); // Start the animation immediately  
  
  if(callback) {
setTimeout(() => {
    callback(this);
}, delay); 
  }
  
  return {
  queue: (call) => {
  if(callback) {
throw new Error('Callback must not be 2');    
  }
setTimeout(() => {
    call(this);
}, delay);       
  }   
  }
}


// it work as sliding element up on duration 
slideUp(delay, callback) {
  const scrollHeight = this.element.scrollHeight;
  const fit = delay / 1000; /* Calculate the transition time in seconds */
  this.element.style.transition = `max-height ${fit}s ease-in-out`;
  this.element.style.overflow = 'hidden';
  this.element.style.maxHeight = `${scrollHeight}px`;
  
  // Trigger the animation
  requestAnimationFrame(() => {
    this.element.style.maxHeight = '0px';    
  });
  
  if(callback) {
setTimeout(() => {
    callback(this);
}, delay); 
  }
  
  return {
  queue: (call) => {
  if(callback) {
throw new Error('Callback must not be 2');    
  }
setTimeout(() => {
    call(this);
}, delay);       
  }   
  }
}

// Define the tickerRight method
 tickerRight(delay = 10, options) { 
      const originalHtml = this.element.innerHTML;
      const timer = delay / 1000;
      const text = this.element.textContent;
      const width = this.element.offsetWidth;
      this.element.style.overflow = 'hidden';
      this.element.style.width = width + 'px';      
      this.element.innerHTML = `<span style="display: inline-block; white-space: nowrap;">${text}</span>`;
      let x = width;
      const intervalId = setInterval(() => {
        x -= 1;
        this.element.querySelector('span').style.transform = `translateX(${x}px)`;
        if (x <= -this.element.querySelector('span').offsetWidth) {
          x = width;
        }
      }, timer);
      
 if(typeof options === 'object') {         
      setTimeout(() => {
        clearInterval(intervalId);
        this.element.style.transform = '';
        this.element.style.overflow = '';
        this.element.innerHTML = originalHtml; // Restore original HTML content
   options.callback(this);   
      }, options.stop || 10000);    
 } else {
   return {
   queue: (call) => {
setTimeout(() => {
        clearInterval(intervalId);
        this.element.style.transform = '';
        this.element.style.overflow = '';
        this.element.innerHTML = originalHtml; // Restore original HTML content
   call(this);   
      }, options || 10000);           
   }    
   } 
 }     
    }


/* it work as scrolling from left to right continuously */
tickerLeft(delay = 10, options) {
  const originalHtml = this.element.innerHTML;
  const timer = delay / 1000;
  const text = this.element.textContent;
  const width = this.element.offsetWidth;
  this.element.style.overflow = 'hidden';
  this.element.style.width = width + 'px';
  this.element.innerHTML = `<span style="display: inline-block; white-space: nowrap;">${text}</span>`;
  let x = -this.element.querySelector('span').offsetWidth;
  const intervalId = setInterval(() => {
    x += 1;
    this.element.querySelector('span').style.transform = `translateX(${x}px)`;
    if (x >= width) {
      x = -this.element.querySelector('span').offsetWidth;
    }
  }, timer);

if(typeof options === 'object') {
  setTimeout(() => {
    clearInterval(intervalId);
    this.element.style.transform = '';
    this.element.style.overflow = '';
    this.element.innerHTML = originalHtml; // Restore original HTML content
    options.callback(this);
  }, options.stop || 10000);
  } else {
return {
   queue: (call) => {
setTimeout(() => {
    clearInterval(intervalId);
    this.element.style.transform = '';
    this.element.style.overflow = '';
    this.element.innerHTML = originalHtml; // Restore original HTML content
    call(this);
  }, options || 10000);       
   }
}     
  }  
}


slideLeft(delay, callback) {
document.body.style.position = 'fixed';
this.element.style.display = 'none';  
  setTimeout(() => {
    this.element.style.display = 'block';
    this.element.style.position = 'relative';
    this.element.style.left = `-${this.element.offsetWidth + 20}px`;
    this.element.style.transition = `left ${delay / 1000}s ease-in-out`;
    setTimeout(() => {
      this.element.style.left = '0px';
    }, 0);
  }, 0);
  

  if(callback) {
setTimeout(() => {
    callback(this);
}, delay); 
}  

return {
  queue: (call) => {
  if(callback) {
throw new Error('Callback must not be 2');    
  }
setTimeout(() => {
    call(this);
}, delay);       
  }   
  }  
}


slideRight(delay, callback) {
document.body.style.position = 'fixed';
  this.element.style.display = 'none';
  setTimeout(() => {
    this.element.style.display = 'block';
    this.element.style.position = 'relative';
    this.element.style.left = `${window.innerWidth}px`;
    this.element.style.transition = `left ${delay / 1000}s ease-in-out`;
    setTimeout(() => {
      this.element.style.left = '0px';
    }, 0);
  }, 0);
  
 
  if(callback) {
setTimeout(() => {
    callback(this);
}, delay);  
}
  
  return {
  queue: (call) => {
  if(callback) {
throw new Error('Callback must not be 2');    
  } 
setTimeout(() => {
    call(this);
}, delay);       
  }   
  }
}


/* Autotyping text automatically */
autoTyping(phrases, options = {}) {
const elementId = this.element;
  const typedTextElement = elementId;
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let loopCount = 0;

  // Set default options
  const typeSpeed = options.typeSpeed || 100;
  const retype = options.retype !== undefined ? options.retype : false;
  const stopAt = options.stopAt || (retype ? null : 'end');
  const loop = options.loop || (retype ? Infinity : 1);
  const endWith = options.endWith || 'last';

  // Convert phrases to array if it's not already
  if (!Array.isArray(phrases)) {
    phrases = [phrases];
  }

  function autoType() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      typedTextElement.innerHTML = currentPhrase.substring(0, currentCharIndex);
      currentCharIndex--;
      if (currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        if (currentPhraseIndex === 0) {
          loopCount++;
          if (loopCount >= loop) {
            if (endWith === 'last') {
              typedTextElement.innerHTML = phrases[phrases.length - 1];
            } else if (endWith === 'first') {
              typedTextElement.innerHTML = phrases[0];
            } else if (endWith === 'empty') {
              typedTextElement.innerHTML = '';
            }
            return clearInterval(intervalId);
          }
        }
      }
    } else {
      typedTextElement.innerHTML = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      // Check if we need to stop or delete
      if (stopAt && currentPhrase.substring(0, currentCharIndex).toLowerCase().includes(stopAt.toLowerCase())) {
        if (retype) {
          isDeleting = true;
        } else {
          return clearInterval(intervalId);
        }
      }

      if (currentCharIndex === currentPhrase.length) {
        if (retype) {
          if (stopAt === null) {
            setTimeout(() => {
              isDeleting = true;
            }, 1000); // wait 1 second before deleting
          } else {
            isDeleting = true;
          }
        } else {
          currentCharIndex = 0;
          if (loopCount < loop - 1) {
            loopCount++;
          } else {
            if (endWith === 'last') {
              typedTextElement.innerHTML = phrases[phrases.length - 1];
            } else if (endWith === 'first') {
              typedTextElement.innerHTML = phrases[0];
            } else if (endWith === 'empty') {
              typedTextElement.innerHTML = '';
            } 
            return clearInterval(intervalId);
          }
        }
      }
    }
  }

  const intervalId = setInterval(autoType, typeSpeed);
}


/* replace element not */
keepChar(charsToKeep, replacement, global = false) {
  const regex = new RegExp(`[^${charsToKeep}]`, global ? 'g' : '');
  return this.check.toString().replace(regex, replacement);
}


/* fade out html element based on delay */
fadeOut(delay = 0, callback) {
  this.element.style.display = 'block';
  this.element.style.opacity = 1;
  this.element.style.transition = `all ${delay / 1000}s`;
  setTimeout(() => {
    this.element.style.opacity = 0;
  }, 0); 
  setTimeout(() => {
    this.element.style.display = 'none';
  }, delay); 
  

  if(callback) {
setTimeout(() => {
    callback(this);
}, delay); 
}  
  
  return {
  queue: (call) => {
  if(callback) {
throw new Error('Callback must not be 2');    
  }
setTimeout(() => {
    call(this);
}, delay);       
  }   
  }
}



/* fade in html element based on delay */
fadeIn(delay = 0, callback) {
  const fitd = delay / 1000;
  this.element.style.transition = `all ${fitd}s`;
  this.element.style.display = 'block';
  this.element.style.opacity = 0;
  this.element.offsetHeight; // Trigger a reflow
  this.element.style.opacity = 1;
  

  if(callback) {
setTimeout(() => {
    callback(this);
}, delay); 
}  
  
  return {
  queue: (call) => {
  if(callback) {
throw new Error('Callback must not be 2');    
  }
setTimeout(() => {
    call(this);
}, delay);       
  }   
  }
}

/* delay element */
delay(delay = 0) {  
  this.element.style.transitionDelay = `${delay}ms`;
 return this;
  }
  

/* remove element */
remove() {
  this.parent = this.element.parentNode;
  this.nextSibling = this.element.nextSibling;
  this.rems = this.element;
  this.element.remove();
  return {
    assignTo: (assign) => {
      assign.append(this.rems);
    },
    restore: () => {
      if (this.nextSibling) {
        this.parent.insertBefore(this.rems, this.nextSibling);
      } else {
        this.parent.appendChild(this.rems);
      }
    }
  }
}


/* asterisk element function */
asterisk(changeTo = "*", auto) {
  let tag;

  if (['INPUT', 'TEXTAREA'].includes(this.element.tagName)){
    tag = 'value';   
  } else {
    tag = 'textContent';
  }

  const data = this.element[tag];

  if (changeTo && !auto) {
  try {
    if (!this.element[tag].includes(changeTo)) {
      const trds = this.element[tag].replace(/./g, changeTo);
      this.element.originalData = data;
      this.element[tag] = trds;
    } 
  return data;
  } catch {
throw new Error("Cannot asterisk() multiple element at once need to use each()");      
  }    
  } else {   
    const element = this.element;   
  try {
      let tag = ['INPUT', 'TEXTAREA'].includes(element.tagName) ? 'value' : 'textContent';
      if (!element[tag].includes(changeTo)) {
        element.originalData = element[tag];
        element[tag] = element[tag].replace(/./g, changeTo);
      } else {
        element[tag] = element.originalData;
        delete element.originalData;
      }   
  } catch(err) {
throw new Error("Cannot 'auto' asterisk() multiple element at once need to use each()");    
  }  
}
}


/* cssText function */
cssText(styling, override = true) {
  if (typeof styling === 'string') {
    this.element.style.cssText = override ? styling : this.element.style.cssText + styling;
  } else if (styling === undefined || styling === null) {
    return this.element.style.cssText;
  } else {
    throw new Error(`Invalid styling value. Expected a string, but received ${typeof styling}.`);
  }
}


/* Creating floating effect */floatLabel(labelId) {
  const input = this.element;
  if (!input) return;

  const wrapper = document.createElement('div');
wrapper.classList.add('floating-label-wrapper');  
wrapper.style.marginTop = '10px'
  input.parentNode.replaceChild(wrapper, input);
  wrapper.appendChild(input);

  const label = document.createElement('label');
  label.textContent = input.getAttribute('placeholder') || '';
label.classList.add('floating-label'); 
try {
 label.classList.add(labelId)
 } finally {
   label.id = labelId;
 }
     
  wrapper.appendChild(label);

  input.removeAttribute('placeholder');

  const style = document.createElement('style');
  style.textContent = `
    .floating-label-wrapper {
      position: relative; 
      display: inline-block;
    }

    .floating-label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      transition: all 0.2s ease;
      pointer-events: none;
      font-size: {input.style.fontSize};
      color: ${'gray'};
      background: ${input.style.background === 'white' ? 'white' : input.style.background};           
    }

    .floating-label.float {
      top: 0;
      font-size: 12px;
      color: ${input.style.color};             
    }

    .floating-label-wrapper input {      
      font-size: ${input.style.fontSize};      
    }
  `;
  document.head.appendChild(style);

  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      label.classList.add('float');
    } 
  });

  input.addEventListener('focus', () => {
    label.classList.add('float');
  });

  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      label.classList.remove('float');
    }
  });
}


/* insert element to a string with position */
insert(char, position = '0') {
if(position === 'start') {
return char + this.check;   
} else if(position === 'end') {
return this.check + char;   
} else {
 return this.check.slice(0, position) + char + this.check.slice(position);
}
}

/* Contenteditable true function */
edit(options) {
  const element = this.element;
  element.setAttribute('contenteditable', 'true');

  let placeholder = ''; 
  let id = '';  
  if (typeof options === 'string' || !options) {           
  id = options;  
  placeholder = element.getAttribute('placeholder');            
  } else if(typeof options === 'object') {
  id = options.id
  placeholder = options.placeholder;    
  } 
  
 element.dataset.placeholder = placeholder;
 element.id = id;
 
element.addEventListener('input', () => {
    if(element.textContent.length > 0) {
  element.id = null;   
    } else {    
  element.id = id;   
    }
})


  let style = document.querySelector('style[data-placeholder-style]');
  if (!style) {
    style = document.createElement('style');
    style.dataset.placeholderStyle = '';
    style.innerHTML = `
      [data-placeholder]:empty::before {
     content: attr(data-placeholder);             
      }   
    `;
    document.head.appendChild(style);
  }
}

/* add hr line to element */
lineIt(type, option = {}) {
  let text = typeof type === 'string' || typeof type === 'number' && type ? type : this.element.textContent;

let options = typeof type === 'object' && !option ? type : option;


  const span = this.element;
  span.innerHTML = `
    <hr style="flex-grow: 1; border: none; border-top: ${options.border || '2px'} solid ${options.color || 'black'}; border-radius: ${options.radius || '2px'};">
    <span style="padding: ${options.padding || '0 10px'};">${text}</span>
    <hr style="flex-grow: 1; border: none; border-top: ${options.border || '2px'} solid ${options.color || 'black'}; border-radius: ${options.radius || '2px'};">
  `;
  span.style.display = 'flex';
  span.style.alignItems = 'center';
  span.style.textAlign = 'center';  
}

  
/* forEach utility function */
each(callback) {
Array.from(this.element).forEach((e, i, a) => {
try {
callback(e, i, a)   
} catch {
 callback(new myJutils(e), i, a);  
}
})    
}


/* filter utility function */
filter(callback) {
  return Array.from(this.element).filter((e, i, a) => {
    try {
      return callback(e, i, a);
    } catch (error) {      
      console.error(error);
      return false;
    }
  });
}


/* map utility function */
map(callback) {
  return Array.from(this.element).map((e, i, a) => {
    try {
      return callback(e, i, a);
    } catch (error) {
      console.error(error);
      return null; // or some other default value
    }
  });
}


/* reduce utility function */
reduce(callback, initialValue = 0) {
  return Array.from(this.element).reduce((accumulator, currentValue, index, array) => {
    try {
      return callback(accumulator, currentValue, index, array);
    } catch (error) {
      console.error(error);
      return accumulator; // or some other default behavior
    }
  }, initialValue);
}


/* find utility function */
find(callback) {
  return Array.from(this.element).find((elem, index, array) => {
    try {
      return callback(elem, index, array);
    } catch (error) {
      console.error(error);
      return false; // or some other default behavior
    }
  });
}


/* some utility function */
some(callback) {
  return Array.from(this.element).some((elem, index, array) => {
    try {
      return callback(elem, index, array);
    } catch (error) {
      console.error(error);
      return false; // or some other default behavior
    }
  });
}


in(type) {
  const str = this.element;
  switch(type) {
    case 'upper': 
      return (str.match(/[A-Z]/g) || []).length;
    case 'lower':
      return (str.match(/[a-z]/g) || []).length;
    case 'number': 
      return (str.match(/[0-9]/g) || []).length;
    case 'alpha': 
      return (str.match(/[a-zA-Z]/g) || []).length;
    case 'special':
  return (str.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/g) || []).length;
    case 'emoji':
      return (str.match(/\p{Extended_Pictographic}/gu) || []).length;                   
  }  
}


/* random array class methods */
 asc(key) {
 const array = this.check;
    if (key) {
      const isNumeric = typeof array[0][key] === 'number';
      return array.sort((a, b) => isNumeric ? a[key] - b[key] : a[key].localeCompare(b[key]));
    } else {
      const isNumeric = typeof array[0] === 'number';
      return array.sort((a, b) => isNumeric ? a - b : a.localeCompare(b));
    }
  }


 desc(key) {
 const array = this.check;
    if (key) {
      const isNumeric = typeof array[0][key] === 'number';
      return array.sort((a, b) => isNumeric ? b[key] - a[key] : b[key].localeCompare(a[key]));
    } else {
      const isNumeric = typeof array[0] === 'number';
      return array.sort((a, b) => isNumeric ? b - a : b.localeCompare(a));
    }
  }

 reverse() { 
    return this.check.reverse();
  }


 rand() {
const array = this.check; 
    return array[Math.floor(Math.random() * array.length)];
  }


/* Clipboard copy text  */
 copy(callback) {
const text = this.check; 
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (callback) callback(true);
    }, () => {
      if (callback) callback(false);
    });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (callback) callback(successful);
    } catch (err) {
      if (callback) callback(false);
    }

    document.body.removeChild(textarea);
  }
}


/* make text not ccopyable */
 uncopy() {
 const element = this.element;
    if (element) {
    const style = document.createElement('style');
    style.textContent = `
      .uncopyable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
    element.classList.add("uncopyable");
    element.addEventListener("selectstart", function(event) {
      event.preventDefault();
    });
  element.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
  }
}


/* hash element */
hash(mode = '', pin = '') {
  const element = this.check;
  let hash = '';
  let multiplier = 1;
  let offset = 0;

  if (mode === 'DEFAULT') {
    multiplier = 2 * element.length;
  } else if (mode === 'PRIVACY') {
    multiplier = pin.length * 2 + element.length;
  try { 
    offset = pin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    } catch {
 throw new Error('hash() pin must be a string');  
    }
  } else if (mode === 'HIGH_SECURITY') {
    const hashBuffer = [];
    for (let i = 0; i < pin.length; i++) {
      hashBuffer.push(pin.charCodeAt(i));
    }
    for (let i = 0; i < element.length; i++) {
      hashBuffer.push(element.charCodeAt(i));
    }
    let hashValue = 2166136261;
    for (let i = 0; i < hashBuffer.length; i++) {
      hashValue = hashValue ^ hashBuffer[i];
      hashValue = hashValue * 16777219;
    }
    hash = hashValue.toString(16);
  } else if(mode) {
  throw new TypeError(`"${mode}" is not a valid mode`);    
  }

  for (let i = 0; i < element.length; i++) {
    const charCode = element.charCodeAt(i);
    const hashedChar = String.fromCharCode(charCode + (i % 10) * multiplier + offset);
    hash += hashedChar;
  }
  return hash;
}


/* unhashed already hashed element */
unhash(mode = '', pin = '') {
  const element = this.check;
  let unHash = '';
  let multiplier = 1;
  let offset = 0;

  if (mode === 'DEFAULT') {
    multiplier = 2 * element.length;
  } else if (mode === 'PRIVACY') {
    multiplier = pin.length * 2 + element.length;
    try { 
    offset = pin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
     } catch {
 throw new Error('unhash() pin must be a string');  
    }
  } else if(mode === 'HIGH_SECURITY') {
throw new Error('Cannot unhash HIGH_SECURITY mode');      
  } else if(mode) {
  throw new TypeError(`"${mode}" is not a valid mode`);    
  }
  

  for (let i = 0; i < element.length; i++) {
    const charCode = element.charCodeAt(i);
    const unHashedChar = String.fromCharCode(charCode - (i % 10) * multiplier - offset);
    unHash += unHashedChar;
  }
  return unHash;
}


/* sanitize user input */
sanitize(...filters) { 
  const filterFunctions = {
    emoji: (c) => /[\p{Extended_Pictographic}\u200d]/u.test(c),
    number: (c) => /[0-9]/.test(c),
    lowercase: (c) => /[a-z]/.test(c),
    uppercase: (c) => /[A-Z]/.test(c),
    alphabet: (c) => /[a-zA-Z]/.test(c),
    special: (s) => s.replace(/[^!@#$%^&*()_+={}[\]|\:;"<>,.?/~`]/g, ''),
  };

  let result = '';
  for (const char of this.check) {
    if (filters.some((filter) => filterFunctions[filter](char))) {
      result += char;
    }
  }

  return result;
} 


/* filterOut element method */
filterOut(...filters) {
  const filterFunctions = {
    emoji: (s) => s.replace(/[\p{Extended_Pictographic}\u200d]+/gu, ''),
    number: (s) => s.replace(/[0-9]/g, ''),
    lowercase: (s) => s.replace(/[a-z]/g, ''),
    uppercase: (s) => s.replace(/[A-Z]/g, ''),
    alphabet: (s) => s.replace(/[a-zA-Z]/g, ''),    
    special: (s) => s.replace(/[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/gu, ''),
  };

  let result = this.check.toString();
  filters.forEach((filter) => {
    if (!filterFunctions[filter]) {
      throw new Error(`Invalid filter: ${filter}`);
    }
    result = filterFunctions[filter](result);
  });

  return result;
}




/* Swipe from left to right  */
 swipeLeft(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,     
    callback: (e) => {
  console.log(e);      
    },
  };

  const opts = { ...defaults, ...options };

  let startX = 0;
  let target = this.element;

  target.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  target.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    if (!opts.targetElement && startX > opts.edgeThreshold) return; // check if start point is close enough to the edge
    if (endX - startX > opts.threshold) {
      opts.callback("Swiped from left!");
    }
  });
}



/* Swipe from bottom to top */
 swipeBottom(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,    
    callback: (e) => {
  console.log(e);      
    },
  };

  const opts = { ...defaults, ...options };

  let startY = 0;
  let target = this.element;

  target.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
  });

  target.addEventListener('touchend', (event) => {
    const endY = event.changedTouches[0].clientY;
    if (!opts.targetElement && startY < window.innerHeight - opts.edgeThreshold) return; // check if start point is close enough to the bottom edge
    if (startY - endY > opts.threshold) {
      opts.callback("Swiped from bottom!");
    }
  });
}


/* Swipe from top to down */
 swipeTop(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,    
    callback: (e) => {
  console.log(e);      
    },
  };

  const opts = { ...defaults, ...options };

  let startY = 0;
  let target = this.element;

  target.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
  });

  target.addEventListener('touchend', (event) => {
    const endY = event.changedTouches[0].clientY;
    if (!opts.targetElement && startY > opts.edgeThreshold) return; // check if start point is close enough to the top edge
    if (endY - startY > opts.threshold) {
      opts.callback("Swiped from top!");
    }
  });
}


/* Swipe from right to left  */
 swipeRight(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,    
    callback: (e) => {
   console.log(e);     
    },
  };

  const opts = { ...defaults, ...options };

  let startX = 0;
  let target = this.element;

  target.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  target.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    if (startX < window.innerWidth - opts.edgeThreshold) return; // only trigger if swipe starts from right edge
    if (startX - endX > opts.threshold) {
      opts.callback('swipe from right!');
    }
  });
}






 







}




function $(selector, all) {
return new myJutils(selector, all);
}







 $.upper = function(element) {
return element.toUpperCase(); 
}


$.lower = function(element) {
return element.toLowerCase();  
}


$.int = function(element) {
return parseInt(element); 
}


$.float = function(element) {
return parseFloat(element);
}


// JSON.stringify function 
$.json = function(element) {
  return JSON.stringify(element);
}


// JSON.parse function 
$.parse = function(element) {
return JSON.parse(element);     
}


/* toFixed function */
$.fixed = function(element, length = 2) { 
 if(isNaN(element) || isNaN(length)) {
   throw new Error(`fixed() argument must not include alphabet '${number}'  '${length}'`);
 } else {
return parseFloat(element).toFixed(length);      
}  
 }
 

/* setInterval */
$.interval = function(callback, timer = 0) {
if(arguments.length === 1) {
 return clearInterval(callback);     
} else if(arguments.length === 2) {
if(typeof callback === 'function') {    
const intervalId = setInterval(() => {
    callback(this);
}, timer);
return intervalId;
} else {
  setTimeout(() => {
   return clearInterval(callback);  
}, timer); 
}
}
}


/* setTimeout */
$.timeout = function(callback, timer = 0) {
  if(arguments.length === 1) {
return clearTimeout(callback);     
  } else if(arguments.length === 2) {
  if(typeof callback === 'function') {    
const timeoutId = setTimeout(() => {
 callback(this);   
}, timer); 
return timeoutId;   
  } else {
  setTimeout(() => {
 return clearTimeout(callback);     
}, timer); 
  }  
}
}


/* reload page location.reload  */
$.reload = function(timer) {
   if(!timer) {
    location.reload();   
   } else {
  setTimeout(() => {
   location.reload();    
  }, timer);    
   } 
}


/* redirect url */
$.redirect = function(url, timer) {
   if(arguments.length === 1) {   
   window.location.href = url;           
   } else if(arguments.length === 2) {
  setTimeout(() => {
   window.location.href = url;       
  }, timer);  
   } 
}

/* Element to string */
$.str = function(element) {  
   return element.toString();
}      


/* fetch api data auto XML */    
 $.getData = function(...args) {
    if (args.length % 2 !== 0) {
        throw new Error('Number of arguments must be even');
    }

    if (args.length > 100) {
        throw new Error('Number of arguments exceeds 100');
    }

    const pairs = [];

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i];
        const value = args[i + 1];
        pairs.push(`${key}=${value}`);
    }

    return pairs.join('&');
}

      


let alrs = 0;

$.alert = function(text = '', btn1 = 'OK') {
return new Promise((resolve, reject) => {
  const currentId = alrs++;
  const div = document.createElement('div');
  div.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: gray; z-index: ${999 - alrs + currentId}; display: flex; justify-content: center; align-items: center; border-radius: 0px;" id="backdrop-${currentId}">
      <div id="ralert-${currentId}" style="padding: 30px; border-radius: 5px; background: #fff; border: 1px solid #ddd; width: 70%; max-width: 500px; z-index: ${1000 - alrs + currentId};">
        <p style="margin-top: -5px; margin-bottom: 50px; max-height: 350px; overflow-y: auto; background: white; color: black;" id="page-${currentId}">${text}</p>
        <button id="btn1-${currentId}" style="float: right; margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn1}</button>
      </div>
    </div>
  `;
  document.body.append(div);
  document.getElementById(`btn1-${currentId}`).onclick = function () {
  resolve('true');
    div.remove();
  }
  document.addEventListener('click', (event) => {
    if(event.target.id === `backdrop-${currentId}`) {
      div.remove();
    }
  })
  })
}


let conrs= 0;

$.confirm = function(text = '', btn1 = 'CANCEL', btn2 = 'OK') {
  return new Promise((resolve, reject) => {
    const currentId = conrs++;
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: gray; z-index: ${999 - conrs + currentId}; display: flex; justify-content: center; align-items: center; border-radius: 0px;" id="backdrop-${currentId}">
        <div id="rconfirm-${currentId}" style="padding: 30px; border-radius: 5px; background: #fff; border: 1px solid #ddd; width: 70%; max-width: 500px; z-index: ${1000 - conrs + currentId};">
            
          <p style="margin-top: -5px; margin-bottom: 50px; background: white; color: black;" id="page1-${currentId}">${text}</p>
          <div style="float: right; margin: 5px; background: white; color: black;">
            <button id="btn1-${currentId}" style="margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn1}</button>
            <button id="btn2-${currentId}" style="margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn2}</button>
          </div>
        </div>
      </div>
    `;
    document.body.append(div);
    document.getElementById(`btn1-${currentId}`).onclick = function () {
      resolve({ value: 'false', text: document.getElementById(`page1-${currentId}`).textContent });
      div.remove()
    }
    document.getElementById(`btn2-${currentId}`).onclick = function () {
      resolve({ value: 'true', text: document.getElementById(`page1-${currentId}`).textContent });
      div.remove()
    }
    document.addEventListener('click', (event) => {
      if(event.target.id === `backdrop-${currentId}`) {
        div.remove();
      }
    })
  })
}


let promyr = 0;

$.prompt = function(text = '', btn1 = 'CANCEL', btn2 = 'OK') {
  return new Promise((resolve, reject) => {
    const currentId = promyr++;
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: gray; z-index: ${999 - promyr + currentId}; display: flex; justify-content: center; align-items: center; border-radius: 0px;" id="backdrop-${currentId}">
        <div id="rprompt-${currentId}" style="padding: 30px; border-radius: 5px; background: #fff; border: 1px solid #ddd; width: 70%; max-width: 500px; z-index: ${1000 - promyr + currentId};">
          <p style="margin-top: -5px; margin-bottom: 50px; background: white; color: black;" id="pages-${currentId}">${text}</p>
          <input id="test-${currentId}" type="text" style="outline: none; border: none; border-bottom: 2px solid black; width: 100%; background: white; color: black;">
          <button id="btn1-${currentId}" style="float: left; margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn1}</button>
          <button id="btn2-${currentId}" style="float: right; margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn2}</button>
        </div>
      </div>
    `;
    document.body.append(div);
    document.getElementById(`btn1-${currentId}`).onclick = function () {
      resolve({ value: 'null', text: document.getElementById(`pages-${currentId}`).textContent });
      div.remove()
    }
    document.getElementById(`btn2-${currentId}`).onclick = function () {
      resolve({ value: document.getElementById(`test-${currentId}`).value, text: document.getElementById(`pages-${currentId}`).textContent });
      div.remove()
    }
    document.addEventListener('click', (event) => {
      if(event.target.id === `backdrop-${currentId}`) {
        div.remove();
      }
    })
    document.getElementById(`test-${currentId}`).focus();
  })
}
 
 
// random number function 
$.randInt = function(min, max) {
  if(arguments.length === 1) {
return Math.floor(Math.random() * min);    
  } else if(arguments.length === 2) {
return Math.floor(Math.random() * (max - min + 1)) + min;      
  } 
}     


/* validate user email address and return boolean */
$.validateEmail = function(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}


/* Sanitizes a string to prevent XSS and SQL injection attacks. */
$.sanitize = function(input, callback) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  const originalInput = input;

  // Remove HTML tags
  input = input.replace(/<\/?[^>]+(>|$)/g, '');

  // Remove script tags and JavaScript code
  input = input.replace(/<script.*?>.*?<\/script>/gi, '');
  input = input.replace(/javascript:/gi, '');
  input = input.replace(/on\w+=/gi, ''); // Remove event handlers

  // Remove SQL injection attempts (note: this is not foolproof and should not be relied upon for SQL security)
  input = input.replace(/UNION|SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|grant|revoke|exec|execute|fetch|desc|describe|show/gi, '');

  // Remove special characters
  input = input.replace(/[^\w\s.,!?-]/gi, '');

  // Trim whitespace
  input = input.trim();

  if(callback === undefined) {
    return input;
  } else if(typeof callback === 'function'){
return callback(input);    
  } else {
  return originalInput === input;    
  } 
}


/* update history pushstate */
  $.pathPush = function(pathname) {
const currentUrl = new URL(window.location.href);
    currentUrl.pathname = pathname;
    window.history.pushState({}, '', currentUrl.href);        
    }
    
$.searchPush = function(search) {
const currentUrl = new URL(window.location.href);
    currentUrl.search = search;
    window.history.pushState({}, '', currentUrl.href);        
    } 
  
  $.hashPush = function(hash) {
const currentUrl = new URL(window.location.href);
    currentUrl.hash = hash;
    window.history.pushState({}, '', currentUrl.href);        
    }      


/* modify window.location */
  $.href = function(href) {
if(href) {
window.location.href = href;       
} else {
return window.location.href; 
}    
  }

$.protocol = function(protocol) {
if(protocol) {
window.location.protocol = protocol;       
} else {
return window.location.protocol;   
}        
}

$.search = function(search) {
 if(search) {
window.location.search = search;        
 } else {
return window.location.search;            
 }     
    } 

$.port = function(port) {
if(port) {
window.location.port = port;          
} else {
  return window.location.port;
} 
    } 
    
$.hash = function(hash) {
if(hash) {
window.location.hash = hash;          
} else {
return window.location.hash;     
} 
    }         
    
$.replace = function(replace) {
window.location.replace(replace);       
}   

$.assign = function(assign) {
window.location.assign(assign);   
}            
   
 $.path = function(path) {  
if(path) {
window.location.pathname = path;       
} else { 
return window.location.pathname;       
  }  
  }     
   
 $.origin = function() {
 return window.location.origin;    
  }      
  
 $.host = function(host) {
  if(host) {
window.location.host = host;           
  } else {
return window.location.host;     
  }  
    }     


/* custom formData() utility function */
$.formData = function(data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else if (data[key] instanceof File) {
      formData.append(key, data[key]);
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
}


/* localStorage API function */
 $.storage = {
  set: (key, value) => localStorage.setItem(key, value),
  get: (key) => localStorage.getItem(key),
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
  count: () => localStorage.length,
  key: (index) => localStorage.key(index)
};


/* session storage API function */ 
  $.session = {
  set: (key, value) => sessionStorage.setItem(key, value),
  get: (key) => sessionStorage.getItem(key),
  remove: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
  count: () => sessionStorage.length,
  key: (index) => sessionStorage.key(index)
};


/* communicate to server */
$.ajax = function(options = {}) {
  // Validate URL
  if (!options.url || options.url.trim() === "") {
    throw new Error("Url is required");
  }

  const urlRegex = /^(?:https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}(:[0-9]+)?(\/.*)?$/;
  if (!urlRegex.test(options.url)) {
    throw new Error("Invalid Url");
  }

const methods = (options.type || 'GET').toUpperCase();
  let myUrl = options.url;
  let myData = null;   
  let headerValue = options.headerValue || 'application/octet-stream';
  let contentType = options.contentType || 'Content-Type';


 // Prepare URL and data
  if (methods === 'GET' && options.data) {
    if (typeof options.data === 'object') {
      const params = new URLSearchParams(options.data).toString();
 myUrl =  `${options.url}?${param}`;
    } else if (typeof options.data === 'string') {
   myUrl = options.url + '?' + options.data;
    }
  } else if (methods !== 'GET' && options.data) {
myData = options.data; 
 }
  
  
  /* check if browser support fetch API */
if(window.fetch) {
fetch(myUrl, {
  method: methods,
  body: myData,
  headers: {[contentType]: headerValue
  },
  cache: options.cache || 'default',
  credentials: options.credentials || 'same-origin',
  mode: options.mode || 'cors',
  redirect: options.redirect || 'follow',
  referrer: options.referrer || 'no-referrer',
  referrerPolicy: options.referrerPolicy || 'no-referrer-when-downgrade',
  signal: options.signal || null,
})
.then(response => {
    if(!response.ok) {
 options.status('NOT OK ' + response.statusText);       
    }
 try {
return response[options.dataType || 'text']();
} catch {
   throw new Error(`${options.dataType} is not a valid response Type`);
}   
}) 
.then(data => options.success(data)) 
.catch(err => options.error(err));
} else {

/* call XMLHttpRequest object */ 
const httpRequest = new XMLHttpRequest();
 
/* set httpRequest method and url */ 
 httpRequest.open(methods, myUrl, true); 
 
 /* set header  */ httpRequest.setRequestHeader(contentType,  headerValue);  

try {
httpRequest.responseType = options.dataType || 'text'; 
} catch {
throw new Error(`${options.dataType} is not a valid response Type`);
} 

/* success function call */ 
httpRequest.onload = () => {
    if (httpRequest.status >= 200 && httpRequest.status < 300) {      
   options.success(httpRequest.response);
    } else {
      if (typeof options.status === 'function') {
        options.status(`NOT OK ${httpRequest.statusText}`);
      }
    }
   }; 

/* error function call */
httpRequest.onerror = () => {
    if (typeof options.error === 'function') {
   options.error(`Error: ${httpRequest.statusText}`);
    }
  };
 
/* send data to server */  
httpRequest.send(myData);    
}   
}
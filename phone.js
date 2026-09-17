(()=>{
 const phone=document.getElementById('client-phone'),country=document.getElementById('phone-country'),hint=document.getElementById('phone-country-status');
 if(!phone||!country||!window.libphonenumber)return;
 const lib=window.libphonenumber;
 const names=new Intl.DisplayNames(['en'],{type:'region'});
 const countries=lib.getCountries();
 countries.sort((a,b)=>names.of(a).localeCompare(names.of(b))).forEach(code=>{
  const option=document.createElement('option');option.value=code;option.textContent=names.of(code)+' (+'+lib.getCountryCallingCode(code)+')';country.append(option);
 });
 let touched=false;
 function select(code,message){if(!countries.includes(code))return false;country.value=code;hint.textContent=message;return true;}
 country.addEventListener('change',()=>{touched=true;phone.setCustomValidity('');hint.textContent='Calling code +'+lib.getCountryCallingCode(country.value)+'. Enter your local number or a full international number.';});
 phone.addEventListener('input',()=>{touched=true;phone.setCustomValidity('');if(phone.value.trim().startsWith('+')){const parsed=lib.parsePhoneNumberFromString(phone.value);if(parsed?.country)select(parsed.country,'Country selected from your international number.');}});
 window.solutionPhone={validate(){
  phone.setCustomValidity('');
  const raw=phone.value.trim();
  if(!raw){phone.setCustomValidity('Please enter your phone number.');return false;}
  if(!/^[+\d\s().-]+$/.test(raw)){phone.setCustomValidity('Enter a phone number using digits, spaces, +, brackets or hyphens.');return false;}
  const parsed=lib.parsePhoneNumberFromString(raw,country.value||undefined);
  if(!parsed||!parsed.isPossible()){phone.setCustomValidity('Please check your country and enter a complete phone number.');return false;}
  if(parsed.country)country.value=parsed.country;
  return true;
 },number(){return lib.parsePhoneNumberFromString(phone.value.trim(),country.value||undefined)?.number||phone.value.trim();}};
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),4000);
 fetch('/cdn-cgi/trace',{signal:controller.signal,cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.text();}).then(text=>{
  const code=text.match(/^loc=([A-Z]{2})\s*$/m)?.[1];
  if(!touched&&!select(code,'Country estimated from your connection. You can change it below.'))hint.textContent='Select your country and calling code.';
 }).catch(()=>{if(!touched)hint.textContent='Select your country and calling code; automatic detection is unavailable.';}).finally(()=>clearTimeout(timer));
})();

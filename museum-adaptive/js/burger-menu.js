let indicator = true;

function showSideNav(x) {
  x.classList.toggle("change");
  if(indicator){
    document.querySelector('.welcome-text').style.opacity = '0';
    document.querySelector('.navigation-scaled').style.display = 'block';
    indicator = false;
  } else {
    document.querySelector('.welcome-text').style.opacity = '1';
    document.querySelector('.navigation-scaled').style.display = 'none';
    indicator = true;
  } 
}
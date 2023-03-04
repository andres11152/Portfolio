const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const btn = select('#button');
const inputName = select('#nombre');
const inputEmail = select('#email');
const flagsElement = select('#flags');
const textsToChange = selectAll('[data-section]');

/* ===== Loader =====*/
window.addEventListener('load', () => {
    select('.container--loader').style.cssText = 'opacity: 0; visibility: hidden';
});

/*===== Header =====*/
window.addEventListener('scroll', () => {
    select('header').classList.toggle('abajo', window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener('click', function() {
    const navMenu = select('.nav_menu');
    this.classList.toggle('active');
    this.classList.toggle('not-active');
    navMenu.classList.toggle('active');
    navMenu.classList.toggle('not-active');
});

/*===== Cambio de idioma =====*/
const changeLanguage = async language => {
    const texts = await fetch(`./languages/${language}.json`).then(res => res.json());
    textsToChange.forEach(textToChange => {
        const { section, value } = textToChange.dataset;
        textToChange.innerHTML = texts[section][value];
    });
};

flagsElement.addEventListener('click', e => changeLanguage(e.target.parentElement.dataset.language));



/*===== Boton y función ir arriba =====*/
window.addEventListener('scroll', () => {
    select('.go-top-container').classList.toggle('show', document.documentElement.scrollTop > 100);
});

select('.go-top-container').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/*===== Efecto 3d imagen principal===== */
const el = document.getElementById("image_home");
const height = el.clientHeight;
const width = el.clientWidth;

el.addEventListener('mousemove', (evt)=> {
    const {layerX, layerY} = evt

    const yRotation = (
        (layerX - width / 2) / width
    ) * 20;

    const xRotation = (
        (layerY - width / 2) / width
    ) * 20;

    const string = `
        perspective(500px)
        scale(1.1)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)`

    el.style.transform = string;
})

el.addEventListener('mouseout', () =>{
    el.style.transform = `
        perspective(500px)
        scale(1.1)
        rotateX(0)
        rotateY(0)`
})
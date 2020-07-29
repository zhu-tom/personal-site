var skills = {
    'jquery': '80%', 
    'javascript': '80%', 
    'python': '80%', 
    'html': '90%', 
    'java': '70%', 
    'firebase': '70%', 
    'git': '60%', 
    'node': '50%', 
    'swift': '50%', 
    'react': '50%', 
    'sql': '40%', 
    'php': '20%',
};

const animateLink = link => new Promise((resolve1) => {
        link.classList.add("hover");
        setTimeout(() => {
            link.classList.remove("hover");
            resolve1();
        }, 250);
});

function toggleSidebar() {
    const sidebar = document.querySelector("#sideNav");
    const toggler = document.querySelector("#sideToggler");
    sidebar.style.left = 0;
    if (sidebar.classList.contains("sideNav-hidden")) {
        sidebar.classList.add("sideNav-visible");
        toggler.classList.add("active");
        sidebar.classList.remove("sideNav-hidden");
    } else {
        sidebar.classList.add("sideNav-hidden");
        sidebar.classList.remove("sideNav-visible");
        toggler.classList.remove("active");
    }
}

const sendEmail = (name, email, subject, body) => Email.send({
        SecureToken: "6abcbb81b4fc2efce7f960850664c736",
        To : 'zhutom01@gmail.com',
        From : `${name} <${email}>`,
        Subject : subject,
        Body : body,
    });

function showAlert(id) {
    const el = document.querySelector(`#${id}`);
    el.classList.add('show');
    setTimeout(() => {
       el.classList.remove('show');
    }, 3000);
}

function isValid(form) {
    form.querySelectorAll("input").forEach((el) => {
        console.log(isFieldValid(el));
        if (!isFieldValid(el)) return false;
    });
    return isFieldValid(form.querySelector("textarea"));
}

const isFieldValid = (el) => (!(el.getAttribute("type") === "email") && el.value) || (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(el.value));

document.addEventListener("DOMContentLoaded", () => {
    let topLinks = document.querySelectorAll("#topNav a");
    animateLink(topLinks[0])
    .then(() => animateLink(topLinks[1]))
    .then(() => animateLink(topLinks[2]))
    .then(() => animateLink(topLinks[3]));

    document.querySelector("#resume").addEventListener("click", () => {
        window.open("./resources/images/Resume.pdf", "_blank");
    });

    $("a.nav-link").click((e) => {
        let top = $($(e.target).attr("href")).offset().top;
        $("html, body").animate({
            scrollTop: top,
        }, 1500);
    });

    document.querySelectorAll("input").forEach(el => {
        el.addEventListener("keyup", ()=>{
            isFieldValid(el) ? el.classList.remove("is-invalid") : el.classList.add("is-invalid");
        });
    });

    document.querySelector("#message").addEventListener("keyup", (event) => {
        isFieldValid(event.target) ? event.target.classList.remove("is-invalid") : event.target.classList.add("is-invalid");
    });

    document.querySelector("#sideToggler").addEventListener("click", () => {                
        toggleSidebar();
    });

    document.querySelector("#submit").addEventListener("click", (event) => {
        event.preventDefault();

        if (isValid(document.querySelector("#contact-form"))) {
            const target = event.currentTarget;
            target.setAttribute("disabled", true);

            const form = document.querySelector("#contact-form");
            form.classList.add("loading");

            let data = {};
            const inputs = form.querySelectorAll(".form-control");
            inputs.forEach((val) => {
                val.setAttribute("disabled", true);
                data[val.getAttribute("name")] = val.value;
            });

            sendEmail(data.name, data.email, data.subject, data.message).then((message) => {
                console.log(message);
                form.classList.remove("loading");
                target.removeAttribute("disabled");

                const isSuccessful = message === "OK";
                showAlert(isSuccessful ? "ok-alert":"error-alert");

                inputs.forEach((val) => {
                    val.removeAttribute("disabled");
                    if (isSuccessful) val.value = "";
                });
            });
        }
    });

    let progressBars = [];
    document.querySelectorAll(".progress-bar").forEach((el) => {
        progressBars.push({element: el, offsetTop: getOffsetTop(el)});
    });

    document.querySelectorAll(".form-control").forEach((val) => {
        val.addEventListener("focus", () => {
            val.previousElementSibling.classList.add("focused");
        });
        val.addEventListener("focusout", () => {
            if (!val.value) val.previousElementSibling.classList.remove("focused");
        });

        if (val.value) val.previousElementSibling.classList.add("focused");
    });

    let toEnterRight = [];
    let experienceList = document.querySelector("#experience").querySelectorAll("li");
    for (const li of experienceList) {
        toEnterRight.push({element: li, offsetTop: getOffsetTop(li)});
    }

    for (const el of document.querySelectorAll("[data-click='scroll']")) {
        const target = el.attributes.href.value;
        const location = getOffsetTop(document.querySelector(target));
        el.addEventListener("click", (e) => {
            $('html, body').animate({
                scrollTop: location,
            }, 1500);
        });
    }

    let sections = [];

    let topNav = document.querySelector("#navbarNav");
    let topNavLimit = getOffsetTop(topNav) + topNav.offsetHeight;
    
    let dividers = [];
    let dividersQuery = document.querySelectorAll(".divider");
    for (const hr of dividersQuery) {
        dividers.push({element: hr, offsetTop: getOffsetTop(hr)});
    }

    let sideNav = document.querySelector("#sideNav");
    let fullSideNav = document.querySelector("#fullNav");

    let navChildrenSide = sideNav.children;
    let navChildrenTop = document.querySelector("#topNav").children;

    for (const el of document.querySelectorAll("#sections > div")) {
        sections.push({element: el, offsetTop: getOffsetTop(el)});
    }

    let isNavShown = toggleNavVisibility(fullSideNav, window.scrollY, topNavLimit, false);
    scrollSpy(navChildrenSide, navChildrenTop, sections, dividers, toEnterRight, progressBars);

    fullSideNav.addEventListener("animationend", () => {
        if (!isNavShown) fullSideNav.style.visibility = "hidden";
    });
                
    document.addEventListener("scroll", () => {
        isNavShown = toggleNavVisibility(fullSideNav, window.scrollY, topNavLimit, isNavShown);
        scrollSpy(navChildrenSide, navChildrenTop, sections, dividers, toEnterRight, progressBars);
    });

    setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip();
        let lastEl = document.querySelector("#contact");
        const height = lastEl.offsetHeight + getOffsetTop(lastEl) + parseInt(window.getComputedStyle(lastEl).marginBottom.replace('px',''));

        document.querySelectorAll("[data-type='bg']").forEach(el => {        
            el.style.height = height + "px";
        });
    }, 0);
});

function getOffsetTop(element) {
    let top = 0;

    while (element) {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    }
    return top;
}

function scrollSpy(navChildrenSide, navChildrenTop, sections, dividers, toEnterRight, progress) {
    let posY = window.scrollY + window.innerHeight;
    let wiggleRoom = window.innerHeight * 0.9;
    sections.forEach((obj, index, arr) => {
        if (posY > obj.offsetTop && obj.element.classList.contains("hidden")) {
            obj.element.classList.remove("hidden");
            obj.element.classList.add("section-shown");
        }

        if (posY > obj.offsetTop + wiggleRoom && (!sections[index+1] || posY < sections[index+1].offsetTop)) {
            for (let i = 0; i < navChildrenTop.length; i++) {
                navChildrenSide[i].classList.remove("active");
                navChildrenTop[i].classList.remove("active");
            }
            navChildrenSide[index].classList.add("active");
            navChildrenTop[index].classList.add("active");
        }
    });

    dividers.forEach((obj, index, arr) => {
        if (posY > obj.offsetTop && obj.element.classList.contains("divider-hidden")) {
            obj.element.classList.remove("divider-hidden");
            obj.element.classList.add("divider-expanded");
        }
    });

    toEnterRight.forEach((obj, index, arr) => {
        if (posY > obj.offsetTop && obj.element.classList.contains("hidden")) {
            obj.element.classList.remove("hidden");
            obj.element.classList.add("li-shown");
        }
    });

    progress.forEach((obj) => {
        if (posY > obj.offsetTop && !obj.element.style.width) {
            obj.element.style.width = skills[obj.element.getAttribute("data-skill")];
        }
    });
}

function toggleNavVisibility(nav, scrollPos, limit, prevIsNavShown) {
    if (scrollPos > limit && !prevIsNavShown) {
        nav.style.visibility = "visible";
        nav.classList.remove("nav-hidden");
        nav.classList.add("nav-shown");
        return true;
    } 
    else if (scrollPos < limit && prevIsNavShown) {
        nav.classList.remove("nav-shown");
        nav.classList.add("nav-hidden");
        const sidebar = document.querySelector("#sideNav");
        sidebar.classList.remove("sideNav-visible");
        sidebar.classList.add("sideNav-hidden");
        const toggler = document.querySelector("#sideToggler");
        sidebar.style.left = 0;
        toggler.classList.remove("active");
        return false;
    }
    return prevIsNavShown;
}
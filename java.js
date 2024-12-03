    var heart = document.querySelector(".heart"),
        reload = document.querySelector(".reload"),
        hearts = document.querySelector(".hearts"),
        allHearts = document.querySelectorAll(".hearts div"),
        heartAnime = document.querySelector(".heart.anime"),
        sliderContainer = document.querySelector(".hearts"),
        slider = document.querySelector('.slider'),
        sliders = slider.children;

    // Ocultar las sliders al principio
    slider.style.display = 'none';

    heart.addEventListener("click", animation);
    reload.addEventListener("click", refresh);
    window.addEventListener('load', onWndLoad, false);

    var initX = null;
    var transX = 0;
    var rotZ = 0;
    var transY = 0;
    var curSlide = null;
    var Z_DIS = 50;
    var Y_DIS = 10;
    var TRANS_DUR = 0.4;

    function animation() {
        heart.classList.add("active");
        reload.setAttribute(
            "style",
            "opacity: 1; cursor: pointer; pointer-events: auto;  "
        );
        heartAnime.style.opacity = "0";

        allHearts.forEach(function (element) {
            element.classList.add("active");
        });

        // Mostrar las sliders cuando se hace clic en el corazón
        slider.style.display = 'block';

        // Mueve las sliders dentro del corazón
        sliderContainer.appendChild(slider);

        init();
    }

    function refresh() {
        heart.classList.remove("active");
        reload.setAttribute("style", "opacity: 0; pointer-events: none;");
        heartAnime.style.opacity = "1";

        allHearts.forEach(function (element) {
            element.classList.remove("active");
        });

        // Ocultar las sliders al recargar
        slider.style.display = 'none';
    }

    function onWndLoad() {
        slider.style.display = 'none';
    }

    function init() {
        var z = 0, y = 0;
        for (var i = sliders.length - 1; i >= 0; i--) {
            sliders[i].style.transform = 'translateZ(' + z + 'px) translateY(' + y + 'px)';
            z -= Z_DIS;
            y += Y_DIS;
        }
        attachEvents(sliders[sliders.length - 1]);
    }

    function attachEvents(elem) {
        curSlide = elem;
        curSlide.addEventListener('mousedown', slideMouseDown, false);
        curSlide.addEventListener('touchstart', slideMouseDown, false);
    }

    function slideMouseDown(e) {
        if (e.touches) {
            initX = e.touches[0].clientX;
        } else {
            initX = e.pageX;
        }
        document.addEventListener('mousemove', slideMouseMove, false);
        document.addEventListener('touchmove', slideMouseMove, false);
        document.addEventListener('mouseup', slideMouseUp, false);
        document.addEventListener('touchend', slideMouseUp, false);
    }

    var prevSlide = null;

    function slideMouseMove(e) {
        var mouseX;
        if (e.touches) {
            mouseX = e.touches[0].clientX;
        } else {
            mouseX = e.pageX;
        }

        transX += mouseX - initX;
        rotZ = transX / 20;
        transY = -Math.abs(transX / 15);

        curSlide.style.transition = 'none';
        curSlide.style.webkitTransform = 'translateX(' + transX + 'px)' + ' rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        curSlide.style.transform = 'translateX(' + transX + 'px)' + ' rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        var j = 1;

        for (var i = sliders.length - 2; i >= 0; i--) {
            sliders[i].style.webkitTransform = 'translateX(' + transX / (2 * j) + 'px)' + ' rotateZ(' + rotZ / (2 * j) + 'deg)' + ' translateY(' + (Y_DIS * j) + 'px)' + ' translateZ(' + (-Z_DIS * j) + 'px)';
            sliders[i].style.transform = 'translateX(' + transX / (2 * j) + 'px)' + ' rotateZ(' + rotZ / (2 * j) + 'deg)' + ' translateY(' + (Y_DIS * j) + 'px)' + ' translateZ(' + (-Z_DIS * j) + 'px)';
            sliders[i].style.transition = 'none';
            j++;
        }

        initX = mouseX;
        e.preventDefault();
        if (Math.abs(transX) >= curSlide.offsetWidth - 30) {
            document.removeEventListener('mousemove', slideMouseMove, false);
            document.removeEventListener('touchmove', slideMouseMove, false);
            curSlide.style.transition = 'ease 0.2s';
            curSlide.style.opacity = 0;
            prevSlide = curSlide;
            attachEvents(sliders[sliders.length - 2]);
            slideMouseUp();
            setTimeout(function () {
                slider.insertBefore(prevSlide, slider.firstChild);
                prevSlide.style.transition = 'none';
                prevSlide.style.opacity = '1';
                slideMouseUp();
            }, 201);
            return;
        }
    }

    function slideMouseUp() {
        transX = 0;
        rotZ = 0;
        transY = 0;
        curSlide.style.transition = 'cubic-bezier(0,1.95,.49,.73) ' + TRANS_DUR + 's';
        curSlide.style.webkitTransform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        curSlide.style.transform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        var j = 1;

        for (var i = sliders.length - 2; i >= 0; i--) {
            sliders[i].style.transition = 'cubic-bezier(0,1.95,.49,.73) ' + TRANS_DUR / (j + 0.9) + 's';
            sliders[i].style.webkitTransform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + (Y_DIS * j) + 'px)' + ' translateZ(' + (-Z_DIS * j) + 'px)';
            sliders[i].style.transform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + (Y_DIS * j) + 'px)' + ' translateZ(' + (-Z_DIS * j) + 'px)';
            j++;
        }

        document.removeEventListener('mousemove', slideMouseMove, false);
        document.removeEventListener('touchmove', slideMouseMove, false);
    }


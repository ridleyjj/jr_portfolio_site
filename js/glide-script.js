const Glide = window.Glide;

var glide;

var glideOptions = {
    type: 'carousel',
    focusAt: 'center',
    perView: 2,
    breakpoints: {
        880: {
            perView: 1,
        },
    },
    gap: '150px',
};

glide = new Glide('.glide', glideOptions);
glide.mount();

self.addEventListener('fetch', function(evt) {
    console.log(evt.request);
})
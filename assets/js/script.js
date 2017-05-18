'use strict';

var search = new Vue({
    el: '#main',
    data: {
        clientID: 'V131V0IPODZOAI4DH0TXB0W1VF4R1QCAHASGHJI35D3KJLWK',
        clientSecret: 'L5RZFRA1K2KPH33H12BFD3MECOJKEBIJSLP14KXYRYW3A5AF',
        foursquareAPI: 'https://api.foursquare.com/v2/',
        apiVersion: '20170514',
        venues: [],
        toggle: false,
        errMsg: false,
    },
    methods: {
        errorMessages: function(val) {
            this.msg = val;
            this.errMsg = true;
            document.getElementById('keyword').value = '';
            document.getElementById('city').value = '';
            // console.log('Error');
        },
        searchPlace: function() {
            var inputKeyword = document.getElementById('keyword');
            var inputCity = document.getElementById('city');
            this.recent = JSON.parse(localStorage.getItem('recent')) || [];

            if (inputKeyword.value !== '' && inputCity.value !== '') {
                this.errMsg = false;
                this.venues = [];
                
                var url = this.foursquareAPI + 'venues/explore?client_id=' + this.clientID + '&client_secret=' + this.clientSecret + '&v=' + this.apiVersion + '&query=' + inputKeyword.value + '&near=' + inputCity.value + '&limit=10&venuePhotos=1';

                this.$http.get(url).then(function (result) {
                    if (result.body.response.groups[0].items.length > 0) {
                        this.toggle = true;
                        this.venues = result.body.response.groups[0].items;
                        
                        if (this.recent.length > 9) this.recent.shift();

                        this.recent.push({
                            keyword: inputKeyword.value,
                            city: inputCity.value
                        });
                        localStorage.setItem('recent',JSON.stringify(this.recent));
                        this.displayrecent = this.recent.slice().reverse();
                    } else this.errorMessages(inputKeyword.value);

                }, function (err) {
                    this.errorMessages(inputKeyword.value);
                });
            }
        },
        photoCheck: function(val) {
            return '/assets/img/header-bg.jpg';
            // if (val.venue.featuredPhotos.items[0].suffix) {
            //     return val.venue.featuredPhotos.items[0].prefix + 'width290' + val.venue.featuredPhotos.items[0].suffix;
            // } else return '/assets/img/header-bg.jpg';
        }
    },
    filters: {
        reverse: function(value) {
            return value.slice().reverse();
        }
    }
})


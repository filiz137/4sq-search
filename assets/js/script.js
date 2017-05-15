var search = new Vue({
    el: '#main',
    data: {
        clientID: 'V131V0IPODZOAI4DH0TXB0W1VF4R1QCAHASGHJI35D3KJLWK',
        clientSecret: 'L5RZFRA1K2KPH33H12BFD3MECOJKEBIJSLP14KXYRYW3A5AF',
        foursquareAPI: 'https://api.foursquare.com/v2/',
        apiVersion: '20170514',
        venues: [],
        toggle: false,
    },
    methods: {
        searchPlace: function(){
            var inputKeyword = document.getElementById('keyword');
            var inputCity = document.getElementById('city');
            this.recent = JSON.parse(localStorage.getItem('recent')) || [];

            if (inputKeyword.value !== '' && inputCity.value !== '') {
                
                var url = this.foursquareAPI + 'venues/explore?client_id=' + this.clientID + '&client_secret=' + this.clientSecret + '&v=' + this.apiVersion + '&query=' + inputKeyword.value + '&near=' + inputCity.value + '&limit=10&venuePhotos=1';

                this.$http.get(url).then(result => {
                    if (result.body.response.groups[0].items.length > 0) {
                        this.toggle = true;
                        this.venues = result.body.response.groups[0].items;
                        
                        if (this.recent.length > 9) this.recent.shift();

                        this.recent.push({
                            keyword: inputKeyword.value,
                            city: inputCity.value
                        })
                        localStorage.setItem('recent',JSON.stringify(this.recent));
                        this.displayrecent = this.recent.slice().reverse();
                    }
                    else {
                        console.log('empty');
                    }                    

                }, err => {
                    console.log('error!');
                });
            }
        }
    },
    filters: {
        reverse: function(value) {
            return value.slice().reverse();
        }
    }
})


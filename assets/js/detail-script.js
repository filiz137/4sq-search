function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var detail = new Vue({
    el: '#detail',
    data: {
        clientID: 'V131V0IPODZOAI4DH0TXB0W1VF4R1QCAHASGHJI35D3KJLWK',
        clientSecret: 'L5RZFRA1K2KPH33H12BFD3MECOJKEBIJSLP14KXYRYW3A5AF',
        foursquareAPI: 'https://api.foursquare.com/v2/',
        apiVersion: '20170514',
        venue: {
            location: {
                address: null,
                city: null,
            },
            rating: null,
            stats: {
                checkinCount: 0,
            },
            contact: {
                phone: null
            },
            categories: {
                name: null
            },
            bestPhoto: {
                prefix: '',
                suffix: ''
            }
        },
        photos: [],
        tips: []     
    },
    methods: {
        placeDetail: function() {
            var id = getParameterByName('id');
            var url = 'https://api.foursquare.com/v2/venues/' + id + '?oauth_token=X2RT1MU3N1LID51FUNE1N3AOOWKB5IRDZY5VZQTE4BOJKLWN&v=20170514';
            var tipsUrl = 'https://api.foursquare.com/v2/venues/' + id + '/tips?sort=recent&oauth_token=X2RT1MU3N1LID51FUNE1N3AOOWKB5IRDZY5VZQTE4BOJKLWN&v=20170514';
            var photosUrl = 'https://api.foursquare.com/v2/venues/' + id + '/photos?oauth_token=X2RT1MU3N1LID51FUNE1N3AOOWKB5IRDZY5VZQTE4BOJKLWN&v=20170514'

            this.$http.get(url).then(result => {    
                this.venue = result.body.response.venue;
            }, err => {
                console.log('error!')
            });

            this.$http.get(tipsUrl).then(result => {
                this.tips = result.body.response.tips.items;
            }, err => {
                console.log('error!')
            });

            this.$http.get(photosUrl).then(result => {
                this.photos = result.body.response.photos.items;
            }, err => {
                console.log('error!')
            });
        },
        filterLimit: function(arr, limit) {
            return arr.slice(0, limit);
        }
    },
    filters: {}
})

detail.placeDetail();
/*c.queue(`http://g.e-hentai.org/g/805224/01cec4c8e1/`)
 c.queue(`http://g.e-hentai.org/s/31c2686285/805224-1`)*
 http://220.133.11.175:49270/h/f7281f32de05825f991dca720fe05898a9829863-549913-1200-1687-jpg/
 keystamp=1429021500-1247d224b7/P015.jpg
 */
var request = require('request')
var _ = require('underscore')

var EH_API_URL = `http://g.e-hentai.org/api.php`
var TEST_GALLERY_URL = `http://g.e-hentai.org/g/805224/01cec4c8e1/`

var galleryUrlToObj = function(galUrl) {
    var tempArr = galUrl.replace('http://g.e-hentai.org/g/', "").split('/')

    return {
        galleryId: tempArr[0],
        galleryToken: tempArr[1]
    }
}

var getGalleryMeta = function (input) {

    var gidList = []
    var _resolve, _reject

    if(_.isString(input)) {
        var _temp = galleryUrlToObj(input)
        gidList.push([_temp.galleryId, _temp.galleryToken])
    }

    request({
        method: 'POST',
        url: EH_API_URL,
        'content-type': 'application/json',
        body: JSON.stringify({
            "method": "gdata",
            "gidlist": gidList
        })
    }, function(error, res, body){
        if(error != null) {
            _reject(error)
        } else {
            _resolve(JSON.parse(body)['gmetadata'])
        }
    })

    var promiseExe = function (resolve, reject) {
        _resolve = resolve
        _reject = reject
    }

    return new Promise(promiseExe)
}

getGalleryMeta(TEST_GALLERY_URL).then(function(res){
    console.log(res)
})
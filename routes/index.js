const express = require( 'express' );
const merge = require( 'merge-img' );
const fs = require( 'fs' );
const router = express.Router();

router.get('/', (request, response, next) => {
	response.render( 'index' );
});

router.post('/parse', (request, response, next) => {
    const images = request.body.images;
    
    let object = {}
    let array  = []
    
    for (let i = 0; i < images.length; i++) {
        let data = images[i].split( '/' );
        let y = data.pop().split( '.' ).shift()
        let x = data.pop()

        if ( Array.isArray( object[x] ) ) {
            object[x].push( __public + images[i] )
        } else {
            object[x] = [__public + images[i]]
        }
 
    }
 
    let length = 0;

    for (const key in object) {
        array.push( __public + key + '.png' )

        merge(object[key], {direction: true}).then(image => {
            image.write(__public + key + '.png', () => {
                
                length++

                console.log('Done: ' + length)

                if ( Object.keys( object ).length == length ) {
                    console.log('stop')

                    merge( array ).then(image => {
                        image.write(__public + 'output.png', () => {
                            console.log( 'complete!' )

                            for (let i = 0; i < array.length; i++) fs.unlink(array[i], () => console.log( 'Removed: ' + i ))
                        })
                    })
                }
            })
        })
    }

	response.send( request.body.images );
});

module.exports = router;
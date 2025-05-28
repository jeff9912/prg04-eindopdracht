import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/player.png'),
    Grass: new ImageSource('images/grass.png'),
    Zombie: new ImageSource('images/zombie.png'),
    Projectile: new ImageSource('images/projectile.png')
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
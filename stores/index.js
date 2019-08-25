import Icestore from '@ice/store'
import expandAside from './expandAside'

const icestore = new Icestore()
icestore.registerStore('expandAside', expandAside)

export default icestore
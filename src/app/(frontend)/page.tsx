import PageTemplate, { generateMetadata } from './[slug]/page'
import {NavbarDemo} from "../../components/navbar/navbar"

export default function MainPage (){
        return <>
                 <NavbarDemo/>
                <div className='w-full grid grid-cols-2 bg-blue-700/10 h-screen'>

                    <div className='col-span-1 w-full h-full text-8xl text-left pt-40 pl-20'>
                            Connet with us now
                    </div>
                    <div className='cols-span-1 w-full h-full '> </div>
                    
                </div>
        </>
}
 

export { generateMetadata }

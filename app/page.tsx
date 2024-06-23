
import Link from 'next/link';



const Home = () => {
  return (
   <>
   <div className="container flex gap-10 justify-center items-center h-screen">
    <Link href='/checkbox' >Checkbox</Link>
    <Link href='/boxes' >Boxes</Link>
   </div>
   </>
  );
};

export default Home;

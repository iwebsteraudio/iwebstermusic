import { NavLink } from "react-router-dom";

const About = ()=>{
    return (

        
      <section className="shadow-md mt-20 mb-96 p-8 rounded-md text-1 font-monaSans bg-white">
      <div className="w-2/3">
      <p className="pb-8 ">
        Hello! I'm &nbsp;
        <b>Ian Webster,</b>
        &nbsp; an acoustic guitarist and singer based in Greater Manchester.
        I'm available for weddings and events across the UK.
      </p>
      <p className="pb-8">
        My repertoire is extensive and constantly growing. I'm comfortable playing the classics
        and crowd-pleasers but I love to learn the songs that most performers don't,
        and get to those songs that everyone knows and can sign along to but few
        performers go near.
      </p>

      <p className="p-8">
        I moved out from Middlesbrough in 2010 with a dream to come to
        Manchester and play music.&nbsp; Since moving, I've learned to sing, I
        studied music and audio at Salford University. &nbsp; 
      </p>
      <p className="p-8">
        {" "}
       I'm available for weddings, events and bar gigs and get a sing-a-long going.
        To bring the party&nbsp; and give people a
        special night they won't forget.
      </p>
      <p className="p-8">
        {" "}
        I have my own PA system and lights and am perfectly happy to learn songs that'll
        make the night the best it can be for the client.
      </p>
     <NavLink to="/contact" className={"underline"}>Click here to inquire or make a booking!</NavLink>
      </div>
    </section>
    )
    
}

export default About;
import React from 'react';

// Team component showcasing the team members and their roles
const Team = () => (
  <div className="team">
    <div className="team-member">
      <img src="/images/person1.jpg" alt="Person 1" className="team-img" />
      <h3>Kristine Soriano</h3>
      <p>
        Kristine is a passionate frontend developer with extensive experience. Her expertise includes:<br/><br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Creating visually appealing, user-friendly applications.<br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Crafting intuitive interfaces and staying updated with the latest web development trends.<br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Ensuring seamless user experiences for our projects.
      </p>
    </div>

    <div className="team-member">
      <img src="/images/person2.jpg" alt="Person 2" className="team-img"/>
      <h3>Aldrin Florendo</h3>
      <p>
        Aldrin is a highly creative designer who plays a key role in shaping the visual identity of our applications. His expertise includes:<br/><br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Transforming concepts into visually stunning and cohesive designs.<br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Having a keen eye for aesthetics and a deep understanding of user experience design.<br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Elevating our projects to new heights with a passion for design excellence.
      </p>
    </div>

    <div className="team-member">
      <img src="/images/person3.jpg" alt="Person 3" className="team-img" />
      <h3>Jerome Pinugu</h3>
      <p>
        Jerome is a seasoned backend developer known for building robust and scalable server-side solutions. His expertise includes:<br/><br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Focusing on performance and reliability to ensure our applications run smoothly.<br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Utilizing strong problem-solving skills for addressing complex development challenges.<br/>
        <span className="bullet-point">&#8226;</span>&nbsp; Dedicating to writing clean, maintainable code contributing significantly to project success.
      </p>
    </div>
  </div>
);

export default Team;

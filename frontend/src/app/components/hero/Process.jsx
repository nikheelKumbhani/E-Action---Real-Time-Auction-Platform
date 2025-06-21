// import { processList } from "../../utils/data";
// import { Container, Heading, Title } from "../../router";

// export const Process = () => {
//   return (
//     <>
//       <section className="process py-24 bg-primary relative">
//         <div className="bg-white w-full py-20 -mt-10 rounded-b-[40px] z-10 absolute top-0"></div>
//         <Container className="py-16 pt-24 text-white">
//           <Heading title="How It Works" subtitle="Easy 4 steps to win" />

//           <div className="content grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
//             {processList.map((item, index) => (
//               <div key={index} className="p-8 bg-[rgba(38,90,77,0.62)] rounded-xl flex items-center justify-center flex-col text-center">
//                 <div className="w-16 h-16">
//                   <img src={item.cover} alt="" />
//                 </div>
//                 <Title level={5} className="my-3 font-normal text-white">
//                   {item.title}
//                 </Title>
//                 <p className="text-gray-300">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </Container>
//         <div className="bg-white w-full py-16 rounded-t-[40px] z-10 absolute -bottom-20"></div>
//       </section>
//     </>
//   );
// };


import React from 'react';

const Process = () => {
  // CSS styles defined within the component
  const styles = {
    section: {
      backgroundColor: '#1a4741',
      padding: '60px 20px',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '0 0 10px 0',
    },
    subtitle: {
      fontSize: '18px',
      fontWeight: 'normal',
      color: '#a8c5c0',
      margin: 0,
    },
    stepsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    },
    step: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '30px 20px',
      flex: '1 1 250px',
      maxWidth: '280px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    stepHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
    icon: {
      width: '70px',
      height: '70px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '0 0 15px 0',
    },
    stepDescription: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#d1e6e2',
    },
    stepNumber: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#fff',
      color: '#1a4741',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  };

  // SVG icons as strings
  const icons = {
    signup: `<svg viewBox="0 0 24 24" fill="#8ce3c8" width="100%" height="100%"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 8h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H9c-.55 0-1-.45-1-1s.45-1 1-1h3V7c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>`,
    auction: `<svg viewBox="0 0 24 24" fill="#8ce3c8" width="100%" height="100%"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/></svg>`,
    closing: `<svg viewBox="0 0 24 24" fill="#8ce3c8" width="100%" height="100%"><path d="M1 21h12v2H1v-2zM5.24 8.07l2.83-2.83 14.14 14.14-2.83 2.83L5.24 8.07zM12.32 1l5.66 5.66-2.83 2.83-5.66-5.66L12.32 1zM3.83 9.48l5.66-5.66 2.83 2.83-5.66 5.66L3.83 9.48z"/></svg>`,
    lastSteps: `<svg viewBox="0 0 24 24" fill="#8ce3c8" width="100%" height="100%"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
  };

  // Function to handle step hover
  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    });
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.currentTarget.style, {
      transform: 'translateY(0)',
      boxShadow: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    });
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>How It Works</h2>
          <p style={styles.subtitle}>Easy 4 steps to win</p>
        </div>
        
        <div style={styles.stepsContainer}>
          {/* Step 1 */}
          <div 
            style={styles.step}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{position: 'relative', width: '100%'}}>
              <div style={styles.stepNumber}>1</div>
            </div>
            <div style={styles.icon} dangerouslySetInnerHTML={{ __html: icons.signup }} />
            <h3 style={styles.stepTitle}>Sign up</h3>
            <p style={styles.stepDescription}>
              Sign your car up via our contact form or via the WhatsApp chat on the website. 
              Send us a couple of pictures of the car that you want to put up for auction.
            </p>
          </div>
          
          {/* Step 2 */}
          <div 
            style={styles.step}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{position: 'relative', width: '100%'}}>
              <div style={styles.stepNumber}>2</div>
            </div>
            <div style={styles.icon} dangerouslySetInnerHTML={{ __html: icons.auction }} />
            <h3 style={styles.stepTitle}>Auction goes online</h3>
            <p style={styles.stepDescription}>
              As soon as we collect enough cars for the auction (we strive for 25 to 40 cars per auction), 
              the auction will show up on the website.
            </p>
          </div>
          
          {/* Step 3 */}
          <div 
            style={styles.step}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{position: 'relative', width: '100%'}}>
              <div style={styles.stepNumber}>3</div>
            </div>
            <div style={styles.icon} dangerouslySetInnerHTML={{ __html: icons.closing }} />
            <h3 style={styles.stepTitle}>Closing auction</h3>
            <p style={styles.stepDescription}>
              After the viewing day(s) the auction is still a few days open for new bids. 
              We evaluate the highest bid after the closing of an auction.
            </p>
          </div>
          
          {/* Step 4 */}
          <div 
            style={styles.step}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{position: 'relative', width: '100%'}}>
              <div style={styles.stepNumber}>4</div>
            </div>
            <div style={styles.icon} dangerouslySetInnerHTML={{ __html: icons.lastSteps }} />
            <h3 style={styles.stepTitle}>The last steps</h3>
            <p style={styles.stepDescription}>
              After the car is sold to the highest bidder, all the cars will be collected by 
              the buyers on a determined date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
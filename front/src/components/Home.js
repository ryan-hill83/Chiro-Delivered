import React, { Component } from 'react';
import './style.css'
import './images/logo_medium.jpg'
import './images/sara.jpg'

class Home extends Component {
  render() {
    return (
        
      <div>
        <img src={require('./images/logo_medium.jpg')} className="largelogo"/>
        <p className="marginleftright">Chiro Delivered is a mobile chiropractic business based in the Heights, serving individuals and businesses in the Greater Houston Area. We come to your home or office to provide care on your schedule. In addition to chiropractic care, we are also certified in Facial Distortion Model, a form of soft tissue work.</p>
        <img src={require('./images/sara.jpg')} className="sara" alt="..."/>
        <p className="marginleftright">Hello! My name is Dr. Sara Grunert. I am the founder and owner of Chiro Delivered. I attended Texas Woman’s University on a gymnastics scholarship. After I graduated from TWU, I attended Parker University in Dallas and received my Doctorate of Chiropractic, as well as certification in soft tissue work (Facial Distortion Model).</p>
        <p className="marginleftright">I pursued a career as a Chiropractor because of the benefits I experienced from receiving chiropractic care both as a young girl who suffered from severe ear infections and as a competitive gymnast who suffered major injuries resulting in two knee surgeries and one back surgery. As a working professional, I continue to see the benefits of chiropractic care in maintaining my overall health and meeting my health goals.</p>
        <p className="marginleftright">Prior to founding Chiro Delivered, I worked in an integrated practice where I was able to continue to expand my knowledge base by working with medical doctors, doctors of osteopathy, and other chiropractors. I also gained valuable experience in adjusting, soft tissue work, and physiotherapy.</p>
        <p className="marginleftright">Outside of work, you will find me cheering on my hometown Chicago Blackhawks or enjoying a glass of wine in the company of my friends and family (which includes my two pups, Louie and Sally).</p>
        <br/>
        <p className="marginleftright"><b>Why Mobile/In Home Care?</b></p>
        <br/>
        <p className="marginleftright">One thing that we all have in common is that we are short on time. When I was practicing in a brick and mortar clinic, one complaint I often heard from patients was that they struggled to find time to attend their appointments. Even a thirty minute appointment would consume an hour or two of their day. This is why I started Chiro Delivered. Instead of my patients taking time away from work or their families to sit in traffic or a waiting room, I come to them to provide care and help achieve their health goals.</p>
        <p className="footer">For any additional information or questions please email dr.sara@chirodelivered.com</p> <p className="footer">&nbsp; Copyright &copy; 2019</p>
      </div>
        
    )
  }
}

export default Home

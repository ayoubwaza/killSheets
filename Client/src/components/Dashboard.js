import React,{useState} from "react";
import styles from "../Css/Dashboard.module.scss";
import { GiLightningSpanner } from 'react-icons/gi'
import { createGlobalStyle } from "styled-components";
import { FaAngleDown, FaAngleUp, FaCheckCircle, FaHourglassEnd, FaMotorcycle, FaDatabase, FaUser, FaMoon } from 'react-icons/fa';
import gipic from '../Images/gipic.jpg';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'; 
var GlobalStyle = createGlobalStyle`
  body{
    width:100%;
    height:100%;
    margin: 0%;
    padding: 0%;
  }
`;
export default function Dashboard() {
    var time = new Date();
    var rightTime = time.toLocaleTimeString();
    const [clt, cltSet] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [Livereurs, setLivreur] = useState(false);
    const [stock, setStock] = useState(false);
    const [themeProv, setThemeProv] = useState('');
  return (
    <div>
      <GlobalStyle />
      <div className={styles.App__Dash}>
        <div className={styles._princi__Dash}>
          <div className={styles.__parent__Dash}>
              <div className={styles.__princi__Title}>
                <div onClick className={styles.__bars}>
                    <div className={styles.__each_bar}></div>
                    <div className={styles.__each_barMiddel}></div>
                    <div className={styles.__each_bar}></div>
                </div>
                <p>Admin Pannel</p>
                <span><FaMoon/></span>
              </div>
            <div className={styles.__three_statis__Dash}>
                <motion.div className={`${styles.__all_three} ${styles.__firstOne}`}
                    initial={{opacity:0,x:-250,skew:4}}
                    animate={{opacity:1,x:0,skew:1}}
                    transition={{delay:.5,type:'spring',stiffness:100}}
                >
                    <i>10 Deatills</i>
                </motion.div>
                <motion.div className={`${styles.__all_three} ${styles.__secondOne}`}
                    initial={{opacity:0,x:-250,skew:4}}
                    animate={{opacity:1,x:0,skew:4}}
                    transition={{delay:.7,type:'spring',stiffness:100}}
                >
                    <i>10 Deatills</i>
                </motion.div>
                <motion.div className={`${styles.__all_three} ${styles.__thirdone}`}
                    initial={{opacity:0,x:-250,skew:4}}
                    animate={{opacity:1,x:0,skew:1}}
                    transition={{delay:.9,type:'spring',stiffness:100}}
                >
                    <i>10 Deatills</i>
                </motion.div>
                <motion.div className={`${styles.__all_three} ${styles.__fourthOne}`}
                    initial={{opacity:0,x:-250,skew:4}}
                    animate={{opacity:1,x:0,skew:1}}
                    transition={{delay:1,type:'spring',stiffness:100}}
                >
                    <i>10 Deatills</i>
                </motion.div>
            </div>
            <p>Chartjs</p>
          </div>
        </div>
        {/*//Aside side........***********************************************************/}
        <div className={styles.Aside__Dash}>
          <p>Admin <span><GiLightningSpanner/></span></p>
          <h1>{rightTime} <span><FaHourglassEnd size='20px'/></span></h1>
          <motion.div
            drag={"x"}
            dragConstraints={{left:-1220,right:0}}
            dragElastic={0.45}
          >
              <img src={gipic} width="200px" height="200px"/>
          </motion.div>
          <motion.div className={styles.__Child__As}
            initial={{opacity:0,y:-250}}
            animate={{opacity:1,y:80}}
            transition={{delay:.8,type:'spring',stiffness:100,bounce:0.7}}
          >
                <div className={`${styles.__handle__aside__labels} ${styles.__handle__aside__labels_clt}`}>
                    <h4> <i><FaUser/></i>Clients {clt ? <span onClick={() => cltSet(false)}><FaAngleUp/></span> : <span onClick={() => cltSet(true)}><FaAngleDown/></span>}</h4>
                    {
                        clt ? (
                            <div className={styles.__labels__Child}>
                                <h6>
                                    <NavLink to='/data'>
                                        Vaikostop
                                    </NavLink>
                                </h6>
                                <h6>Giant gel</h6>
                                <h6>Surabu</h6>
                            </div>
                        )
                        :
                        null
                    }
                </div>
                <div  className={styles.__handle__aside__labels}>
                    <h4><i><FaCheckCircle/></i>Confirms {confirmed ? <span onClick={() => setConfirmed(false)}><FaAngleUp/></span> : <span onClick={() => setConfirmed(true)}><FaAngleDown/></span>}</h4>
                    {
                        confirmed ? (
                            <div>
                                <h6>done</h6>
                                <h6>not yet</h6>
                            </div>
                        )
                        :
                        null
                    }
                </div>
                <div  className={styles.__handle__aside__labels}>
                    <h4><i><FaMotorcycle/></i>Livereurs {Livereurs ? <span onClick={() => setLivreur(false)}><FaAngleUp/></span> : <span onClick={() => setLivreur(true)}><FaAngleDown/></span>}</h4>
                    {
                        Livereurs ? (
                            <div>
                                <h6>hello</h6>
                                <h6>hello</h6>
                                <h6>hello</h6>
                            </div>
                        )
                        :
                        null
                    }
                </div>
                <div
                    className={`${styles.__handle__aside__labels} ${styles.__handle__aside__labels_stoCk}`}
                >
                    <h4><i><FaDatabase/></i>Stock {stock ? <span onClick={() => setStock(false)}><FaAngleUp/></span> : <span onClick={() => setStock(true)}><FaAngleDown/></span>}</h4>
                    {
                        stock ? (
                            <div>
                                <h6>hello</h6>
                                <h6>hello</h6>
                                <h6>hello</h6>
                            </div>
                        )
                        :
                        null
                    }
                </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

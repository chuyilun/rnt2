import Matter from "matter-js";
import  Constants  from "./game/Constants";

let obs=0;

export const resetObs = () => {
  obs=0;
}

const Physics = (entities, { touches, time, dispatch }) => {
    const engine =entities.physics.engine;
    const rocket = entities.rocket.body;

    const lx_diff = Math.pow((l_cheek_x - g_mouth_x), 2);
    const ly_diff = Math.pow((l_cheek_y - g_mouth_y), 2);
    const lvector = Math.sqrt(lx_diff + ly_diff);          //算左邊臉頰到嘴巴的向量 
    const rx_diff = Math.pow((r_cheek_x - g_mouth_x), 2);
    const ry_diff = Math.pow((r_cheek_y - g_mouth_y), 2);
    const rvector = Math.sqrt(rx_diff + ry_diff);         //算右邊臉頰到嘴巴的向量 

    const dx_diff = Math.pow(g_nose_x - g_mouth_x, 2);    //  direction with x
    const dy_diff = Math.pow(g_nose_y - g_mouth_y, 2);    //  direction with y
    const mouthvector = Math.sqrt(dx_diff + dy_diff);     //算嘴巴到鼻子的向量

    const cen_eyes_x = ( r_eyes_x + l_eyes_x ) / 2 ;
    const cen_eyes_y = ( r_eyes_y + l_eyes_y ) / 2 ;      //取眼睛中間的座標
    const ux_diff = Math.pow(cen_eyes_x - g_nose_x, 2);
    const uy_diff = Math.pow(cen_eyes_y - g_nose_y, 2);
    const eyesvector = Math.sqrt(ux_diff + uy_diff);     //算眼睛到鼻子的向量

    const updown = mouthvector-eyesvector;

    // console.log(rocket.position.y)

    //Android部分還不行，火箭改成居民站在星球上，會有隕石跟高級行星掉下來
    //閃躲隕石，吃掉高級行星會獲得一分(笑臉得分)

    if(rocket.position.y > (0-Constants.MAX_HEIGHT/2) && rocket.position.y < (Constants.MAX_HEIGHT/2)){
    // 40-抬頭, 17,18-不動, -7-低頭
      if ( updown > 30 ){
      //   console.log('here')
        Matter.Body.applyForce(rocket, rocket.position, { x:0.00, y: -0.008});
      }
    }else if (rocket.position.y > (Constants.MAX_HEIGHT/2)){
      Matter.Body.applyForce(rocket, rocket.position, { x:0.00, y: -0.005});
    }else if (rocket.position.y < (0-Constants.MAX_HEIGHT/2)){
      Matter.Body.applyForce(rocket, rocket.position, { x:0.00, y: 0.005});
    }

    console.log(rocket.position.y)
    // if((rocket.position.y ))
    if((rocket.position.x >= (rocket.position.x/15)) && (rocket.position.x <= Constants.MAX_WIDTH/15*14) ){
      
        if ( lvector > rvector ){
          Matter.Body.applyForce(rocket, rocket.position, { x:0.001, y: 0.00});     //往右
        //   console.log('右')
        }else if( lvector < rvector ){
          Matter.Body.applyForce(rocket, rocket.position, { x:-0.001, y: 0.00});    //往左
        //   console.log('左')
        }
      }else if ( rocket.position.x < (rocket.position.x/15) ){ 
        Matter.Body.applyForce(rocket, rocket.position, { x:0.005, y: 0.0});
        // 設定左邊如果超過螢幕就會回彈
      }else if ( rocket.position.x > Constants.MAX_WIDTH/15*14 ){
        Matter.Body.applyForce(rocket, rocket.position, { x:-0.005, y: 0.0});
        // 設定右邊如果超過螢幕就會回彈
      }


      ///////////////////////////////////////////////////

      for (let i=1 ; i <= 4 ; i++){
        if ( rocket.position.y <= entities["obs" + i].body.position.y ){
          dispatch({ type: "score"});
        }
      }

      // Object.keys(entities).forEach(key => {
      //   if (key.indexOf("obs" === 0)){
      //     if (entities[key].body.position.y <= rocket.position.y){
      //       dispatch({ type: "score"});
      //     }
      //   }
      // })




    // 控制障礙物出現
    for ( let i=1; i <= 4 ; i++ ){
      if ( entities["obs" + i].body.position.y >=  -1*(Constants.MAX_HEIGHT / 2) ){
        // Matter.Body.setPosition(entities["obs" + i].body, { x: Constants.MAX_WIDTH, y: entities["obs" + i].body.position.y})
        Matter.Body.translate(entities["obs" + i].body, { x: 0, y: 5})
        console.log(i)
      }else{
        Matter.Body.setPosition(entities["obs" + i].body, { x: Constants.MAX_WIDTH, y: entities["obs" + i].body.position.y})
        // Matter.Body.translate(entities["obs" + i].body, { x: 0, y: 1})
      }
    }

    Matter.Engine.update(engine, time.delta);
    return entities;
};

const Trajectory = entities => {
    const obstacles = Object.values(entities).filter(
      item => item.body && item.body.label === 'obstacle'
    );
  
    obstacles.forEach(item => {
      if (item.body.position.x > width || item.body.position.x < 0) {
        Matter.Body.set(item.body, {
          trajectory: randomInt(-5, 5) / 10,
        });
        Matter.Body.setPosition(item.body, {
          x: randomInt(0, width - 30),
          y: 0,
        });
      }
  
      Matter.Body.setPosition(item.body, {
        x: item.body.position.x + item.body.trajectory,
        y: item.body.position.y,
      });
    });
  
    return entities;
  };

  export { Physics, Trajectory };
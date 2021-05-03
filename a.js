const response = fetch(`xxx.com/user`).then((data) => data.json().then((res) => {
                                if (res. success === true) {
                                       return true;
                                }
                        }).catch((res, e) => return res.error(e));
                        
                        
    
    const x = async () => {
        const response = await fetch(`xxx.com/user`);
        
        if (response. success === true) {
        ....
        }
        
        else {
        }
        
    }
    
    const y = async () => {
        // const users = await User.find({});
        // const people = await People.find()
    
        const [users, people] = await Promise. all (["await User.find({})", "await "])
        
        {
        }
        
        [
            
            
        ]
            
          
    }
    

    
    
    //
    counter() -> 1
    counter() -> 2
    counter() -> 3
    
    
    /* code.js */
    
    
    let count = 0;
    
    const counter = async () => {
        count ++;
        
        return count;
    } 
    
    
    const counterFunciton = async () => {
        let ans = counter (); // ans = 1
        ans = counter (); // ans = 2 
    }
    
    
    //
    (function() {
        console.log(1); 
        setTimeout(function(){console.log(2)}, 1000); 
        setTimeout(function(){console.log(3)}, 0); 
        console.log(4);
    })();
    
    // Output, assuming that the other 3 lines (apart from the second one) take < 1 sec
    1
    3
    4 
    2
    
    <h1 style="color: red">
     <p>i am a p tag</p>
    
     helo world
     </h1>
    
    
    
    
    positions: fixed, relative, absolute
    
    
    <div>
        <h1 style="position: relative; top: 0px, left: 20px">hello</h1>
    </div>
    
    
    <div>
        <h1 style="position: absolute; top: 0px, left: 20px">hello</h1>
    </div>
    
    
    
    left: 20px
    top: 0px
    
    
    display: none, inline, block
    
    

multiply(2)(3)(4);

// should result in 24
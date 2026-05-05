(function(){
 
/*gradient*/
    const granimInstance = new Granim({
      element: '#granim-canvas',
      direction: 'left-right',
      isPausedWhenNotInView: false,
      states: {
        "default-state": {
          gradients: [
            ['#004080', '#0077b6', '#023e8a'],
            ['#0096c7', '#00b4d8', '#0077b6'],
            ['#023e8a', '#0096c7', '#004080'],
            ['#0077b6', '#48cae4', '#0096c7'],
          ],
          transitionSpeed: 5000,
        }
      }
    });
    
}());
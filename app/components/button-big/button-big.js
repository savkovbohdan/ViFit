exports.onLoad = args => {
    const container = args.object;

    const icon = container.getViewById('icon');
    const text = container.getViewById('text');
   
    icon.text = container.icon;
    text.text = container.text;
    //console.log(args.object._observers);
   // text.text = container.text;

   //text.bindingContext  = args.object;
   //text.textChange = args.object._observers.textChange;




};


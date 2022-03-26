const email = (req, res, next) => {
  const msg = { message: 'User already registered' };

  const object = req.body;
  
  const result = object.map((element) => {
    const { quantity } = element;
    if (!quantity) return { code: 400, msg: msg[0] };
    if (quantity <= 0) return { code: 422, msg: msg[1] };
    return undefined;
  });  

  const badCase = result.filter((e) => e !== undefined);
  if (badCase.length !== 0) {
    return res.status(badCase[0].code).json(badCase[0].msg);
  } 
   next();
};
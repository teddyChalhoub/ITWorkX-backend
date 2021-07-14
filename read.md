            let user = new userSchema ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            company: req.body.company,
            nbofemployee : req.body.nbofemployee,
            country : req.body.country,
            address : req.body.address,
            notes : req.body.notes,
        });  
            user.save()
            .then(user => { 
                res.json({
                    success: true,
                    message : 'User added Successfully!',
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    message: error.message
                });
            });

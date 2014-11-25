                    $('em.errors').hide();
                    
                    setInterval(function(){
                             //alert("Hello");
                             $('em.errors').fadeOut();
                             $('.message-show').fadeOut();
                             $(".message-show").html('');
                     }, 20000);
                    
                    function checkNewsletterData(){
                        var flag = 0;
                        
                        var name = $('#newsletter-name').val();
                        var email = $('#newsletter-email').val();
                        var msg = $('#newsletter-msg').val();
                        
                        
                        var n= /^([a-zA-Z]{2,80})$/;
                        var matcher=/^([a-zA-Z.0-9])+@([a-zA_Z0-9])+\.([a-zA-Z])/;
                         
                        //for mail validation
                        if(!matcher.test(email))
                            {
                            	$('#newsletter-email').addClass('error');
                           //$('#newsletter-email').siblings('em').html('Please enter your correct email address');
                           //$('#newsletter-email').siblings('em').show();
                              flag =1;
                            }
                            
                        if(!name){
                        	$('#newsletter-name').addClass('error');
                        	$('#newsletter-name').attr('placeholder','Please enter name here');
                        	   //$('#newsletter-name').val('Please enter name here')
                           //$('#newsletter-name').siblings('em').html('Please enter your name');
                           //$('#newsletter-name').siblings('em').show();  
                           flag =1;
                        }    
                        if(!email){
                        	$('#newsletter-email').addClass('error');
                        	$('#newsletter-email').attr('placeholder','Enter your correct email');
                           //$('#newsletter-email').siblings('em').html('Please enter your email id');
                           //$('#newsletter-email').siblings('em').show();  
                           flag =1;
                        }    
                        if(!msg){
                        	$('#newsletter-msg').addClass('error');
                        	$('#newsletter-msg').attr('placeholder','Write some message here to submit this form...');
                        	//$('#newsletter-name').addClass('error');
                           //$('#newsletter-msg').siblings('em').html('Please type your message');
                           //$('#newsletter-msg').siblings('em').show(); 
                           flag =1;
                        }    

                            
                        if(flag==1){
                            return false;
                        }else{
                        	$('#newsletter-name').attr('placeholder','Name:');
                        	$('#newsletter-email').attr('placeholder','Email:');
                        	$('#newsletter-msg').attr('placeholder','Message:');
                            var mail_data = $("#newsletter-bblog").serialize();
                            //console.log(mail_data);
                            $.ajax({
                            type: "POST",
                            url: "mail.php",
                            data: mail_data,
                            beforeSend: function() {

                            },
                            success: function(response) {
                                $(".message-show").show();
                                $(".message-show").html(response);
                                $("#clrbtn").trigger('click');
                                
                            }
                            });
                            return false;
                        }
  
                    }
                    
                        //value cant't be blank
                        $('#newsletter-name').blur(function()
                            {
                                if( !$(this).val() ) {
                                      //$(this).siblings('em').show();
                                      $('#newsletter-name').attr('placeholder','Please enter name here');
                                      $('#newsletter-name').addClass('error');
                                      return false;
                                }else{
                                	$('#newsletter-name').removeClass('error');
                                    //$(this).siblings('em').hide();
                                }
                            });
                            
                        $('#newsletter-email').blur(function()
                            {
                                 
                                if( !$(this).val() ) {
                                	$('#newsletter-email').addClass('error');
                                	$('#newsletter-email').attr('placeholder','Enter your correct email');
                                	
                                      //$('#newsletter-email').siblings('em').html('This field can\'t leave blank');
                                      //$(this).siblings('em').show();
                                      return false;
                                }else{
                                   
                                    var matcher=/^([a-zA-Z.0-9])+@([a-zA_Z0-9])+\.([a-zA-Z])/;
                         
                        
                                    if(!matcher.test($(this).val()))
                                        {
                                            
                                       
                                    //$('#newsletter-email').siblings('em').html('Please enter your correct email address');
                                    //$('#newsletter-email').siblings('em').show();
                                    $('#newsletter-email').addClass('error');

                                        }else{
                                        	$('#newsletter-email').removeClass('error');
                                             //$(this).siblings('em').hide();
                                        }
                                   
                                   
                                   
                                   
                                }
                            });
                            
                        $('#newsletter-msg').blur(function()
                            {
                                if( !$(this).val() ) {
                                	 $('#newsletter-msg').addClass('error');
                                	 $('#newsletter-msg').attr('placeholder','Write some message here to submit this form...');
                                     // $(this).siblings('em').show();
                                      return false;
                                }else{
                                	 $('#newsletter-msg').removeClass('error');
                                   // $(this).siblings('em').hide();
                                }
                            });                        
import iot from './libs/iotPublisher';

const getParams = (cid, action, payload, qos = 0) => {
    return {
        topic: `/redux/${cid}/${action}`,
        payload: JSON.stringify(payload),
        qos
    }
}

export function handler(event, context, callback) {
    
    const {action} = event;

    console.log(action);

    switch (action.type) {
        case 'AUTH_VALIDATION':
            iot.publish(getParams(event.cid, 'authValidated', {
                validation: true
            }), function(err, data){
                if(err){
                    console.log(err);
                    callback(err);
                }
                else{
                    console.log("success?");
                    callback(null, event);
                    //context.succeed(event);
                }
            });
        
        case 'SIGN_UP':
            var params = {
                policyName: 'STRING_VALUE', /* required */
                principal: 'STRING_VALUE' /* required */
            };
            iot.attachPrincipalPolicy(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
            });

            iot.publish(getParams(event.cid, 'SignUp/signedup', {
                validation: true
            }), function(err, data){
                if(err){
                    console.log(err);
                    callback(err);
                }
                else{
                    console.log("success?");
                    callback(null, event);
                    //context.succeed(event);
                }
            });

        default:
            console.log('default...');
    }

    
}
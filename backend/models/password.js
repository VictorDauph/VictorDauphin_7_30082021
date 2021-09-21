//importe le plugin password-validator
const passwordValidator = require('password-validator');

//créé un schéma de données pour mots de passes
const schemaPassword = new passwordValidator();

//définir les propriétés du schéma de mots de passes
schemaPassword
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digit
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = schemaPassword
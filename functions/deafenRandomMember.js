
// Exports the data so it can be Required in other files
module.exports = {
    // executes when the command is called
    deafenMember(members) {
        const randomIndex = Math.floor((Math.random() * members.size));
        members.at(randomIndex).edit({deaf: true});
    }
}
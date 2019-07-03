const birthday = require('../models/birthday').birthday;
const meetup = require('../models/meetup').meetup;
const office = require('../models/office').office;
const aniversary = require('../models/aniversary').aniversary;
const wedding = require('../models/weddingevent').wedding;
const User = require('../models/users').User;

const getAllbirthday = async (req, res,next) => {
  try {
    console.log("What");
    const birthdays = await birthday.find({createdBy:req.params.userID});
    res.status(200).json(birthdays);
  } catch (error) {
    res.status(500).json({
        error: true,
        message: 'Something went wrong...Please try again later.'
    })
  }
};

const getAll= async (req, res,next) => {
  try {
    console.log("What");
    const birthdays = await birthday.find({createdBy:req.params.userID});
    const offices = await office.find({createdBy:req.params.userID});
    const meetups = await meetup.find({createdBy:req.params.userID});
    const weddings = await wedding.find({createdBy:req.params.userID});
    const aniversaries = await aniversary.find({createdBy:req.params.userID});
    res.status(200).json({
        birthdays:birthdays,
        offices:offices,
        meetups:meetups,
        weddings:weddings,
        aniversaries:aniversaries});
  } catch (error) {
    res.status(500).json({
        error: true,
        message: 'Something went wrong...Please try again later.'
    })
  }
};

const getAlloffice = async (req,res,next) =>{
   try {
    const offices = await office.find({createdBy : req.params.userID})
    res.status(200).json(offices);
   } catch(error) {
    res.status(500).json({
        error:true,
        message: 'Something went wrong ...Please try again later'
    })
   }
};

const getAllmeetup = async (req,res,next) =>{
   try {
    const meetups = await meetup.find({createdBy : req.params.userID})
    res.status(200).json(meetups);
   } catch(error) {
    res.status(500).json({
        error:true,
        message: 'Something went wrong ...Please try again later'
    })
   }
};

const getAllwedding = async (req,res,next) =>{
   try {
    const weddings = await wedding.find({createdBy : req.params.userID})
    res.status(200).json(weddings);
   } catch(error) {
    res.status(500).json({
        error:true,
        message: 'Something went wrong ...Please try again later'
    })
   }
};

const getAllaniversary = async (req,res,next) =>{
   try {
    const aniversaries = await aniversary.find({createdBy : req.params.userID})
    res.status(200).json(aniversaries);
   } catch(error) {
    res.status(500).json({
        error:true,
        message: 'Something went wrong ...Please try again later'
    })
   }
};

const createBirthday = async (req, res,next) => {
    console.log(req.body);
    const { output,//address
             text,//name
            chosenDate,//date
             selectedHours,
             selectedMinutes,
             selectedHours2,
             selectedMinutes2,
             createdBy
           } = req.body;
    try {
        const event = new birthday({
            name: text,
            date:chosenDate,
            startTimehr : selectedHours,
            startTimemn : selectedMinutes,
            endTimehr : selectedHours2,
            endTimemn : selectedMinutes2,
            createdBy: createdBy,
            address : output
        });
        console.log(event);
        await event.save();
        console.log("Birthday Created");
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};

const createMeetup = async (req,res,next) => {
    const {text,
           text5,
            chosenDate,
             selectedHours2,
             selectedMinutes2,
             selectedMinutes,
             selectedHours,
             createdBy,
             output
         } = req.body;
         console.log(req.body);
    try {
        const event = new meetup({
            name : text,
            topic : text5,
            date : chosenDate,
            startTimehr : selectedHours,
            startTimemn : selectedMinutes,
            endTimehr : selectedHours2,
            endTimemn : selectedMinutes2,
            createdBy : createdBy,
            address : output
        });
        await event.save();
        console.log("Meetup Created");
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};
const createOffice = async (req, res,next) => {
    const { text,
            chosenDate,
             selectedHours,
             selectedMinutes,
             selectedHours2,
             selectedMinutes2,
             createdBy,
             output
           } = req.body;
           console.log(req.body);
    try {
        const event = new office({
            title: text,
            date:chosenDate,
            startTimehr : selectedHours,
            startTimemn : selectedMinutes,
            endTimehr : selectedHours2,
            endTimemn : selectedMinutes2,
            createdBy: createdBy,
            address : output
        });
        await event.save();
        console.log("Office Created");
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};

const createAniversary = async (req,res,next) => {
    const { createdBy,
            chosenDate,
            selectedHours,
            selectedMinutes,
            selectedHours2,
            selectedMinutes2,
            output,
            text,
            text1,
            text2,
            text3,
            text4
           } = req.body;
           console.log(req.body);
    try {
            const event = new aniversary({
            name:text,
            surname:text1,
            partnername : text2,
            partnersurname:text3,
            title:text4,
            date:chosenDate,
            startTimehr : selectedHours,
            startTimemn : selectedMinutes,
            endTimehr : selectedHours2,
            endTimemn : selectedMinutes2,
            createdBy: createdBy,
            address : output
        });
        await event.save();
        console.log("aniversary Created");
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};

const createWedding = async (req,res,next) => {
    const {createdBy,
            chosenDate,
            selectedHours,
            selectedMinutes,
            selectedHours2,
            selectedMinutes2,
            output,
            text,
            text1,
            text2,
            text3,
            text4
           } = req.body;
    try {
            const event = new wedding({
            name:text,
            surname:text1,
            partnername : text2,
            partnersurname:text3,
            title:text4,
            date:chosenDate,
            startTimehr : selectedHours,
            startTimemn : selectedMinutes,
            endTimehr : selectedHours2,
            endTimemn : selectedMinutes2,
            createdBy: createdBy,
            address : output
        });
        await event.save();
        console.log("Wedding Created");
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};
//////////////////////////////////////////////////
//////////////////////////////////////////////////


const getBirthdayByID = async (req, res) => {
    const eventID = req.params.ID;
    try {
        console.log("here");
        const event = await birthday.findOne({ _id: eventID });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};

const getMeetupByID = async (req, res) => {
    const eventID = req.params.ID;
    try {
        const event = await meetup.findOne({ _id: eventID });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};

const getOfficeByID = async (req, res) => {
    const eventID = req.params.ID;
    try {
        const event = await office.findOne({ _id: eventID });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};

const getWeddingByID = async (req, res) => {
    const eventID = req.params.ID;
    try {
        const event = await wedding.findOne({ _id: eventID });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};

const getAniversaryByID = async (req, res) => {
    const eventID = req.params.ID;
    try {
        const event = await aniversary.findOne({ _id: eventID });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};


const createInvite = async (req, res) => {
    const eventID = req.params.eventID;
    const { to, from } = req.body;
    try {
        const invite = new Invite({
            event: eventID,
            to: to,
            from: from,
        });
        await invite.save();
        await Event.findOneAndUpdate({ _id: eventID }, {
            $push: {
                "invites": invite._id
            }
        });
        await User.findOneAndUpdate({ _id: to }, {
            $push: {
                "invites": invite._id
            }
        });
        res.status(200).json({
            success: true,
            message: 'Successfully sent invite/s'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later'
        })
    }
};

const cancelInvite = (req, res) => {
    const eventID = req.params.eventID;
    const inviteID = req.params.inviteID;

    try {
        const invite = Invite.findOneAndDelete({ _id: inviteID });
        console.log(invite);
        Event.findOne({ _id: eventID }, { $pull: { invites: inviteID }});
        User.findOne({ _id: inviteID.to }, {
            $pull: {
                "invites": inviteID
            }
        });
        res.status(200).json({
            success: true,
            message: 'Something went wrong...Please try again later.'
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong...Please try again later.'
        })
    }
};

const getEventInvites = async (req, res) => {
    try {
        const eventID = req.params.eventID;
        const invites = await Event.findOne({ _id: eventID }).populate('invites').invites;
        res.status(200).json(invites);
    } catch (errpr) {
        res.status(500).json({
            error: true,
            message: 'Something Went wrong..Please try again later.'
        });
    }
};

module.exports = {
    getAll,
    getAllbirthday,
    getAllmeetup,
    getAlloffice,
    getAllwedding,
    getAllaniversary,
    getAniversaryByID,
    getWeddingByID,
    getOfficeByID,
    getMeetupByID,
    getBirthdayByID,
    createWedding,
    createAniversary,
    createOffice,
    createMeetup,
    createBirthday,
    createInvite,
    cancelInvite,
    getEventInvites
};


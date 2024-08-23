export const issues = {
Motherboard: {
  details: ["No-Power", "Power on but no Post issue", "Auto Restart issue", "Liquid spill", "DEF AC Port", "DMG AC Port", "DEF USB-A Port", "DEF Headphone Port", "DMG Power Button","Graphic issue leading unit to freeze", "Wrong Serial Number","Wrong Stable Device Secret ID causing Enroll issue", "DEF TouchScreen functionality"],
  recommendations: ["Replace Motherboard", "Reflow Motherboard DEF Port", "Reflow Motherboard DMG Button", "(Reflow Port/Button or replace Motherboard)","Update Serial Number", "Update Stable Device Secret ID"]
},
Daughterboard: {
  details: ["DMG AC Port", "DMG USB-A Port","DEF AC Port", "DEF USB-A Port", "DMG Power Button", "DMG Audio Button", "Sticky Buttons", "DEF Headphone Port", "Liquid spill"],
  recommendations: ["Replace Daughterboard", "Reflow Daughterboard DEF Port", "Reflow Daughterboard DMG Button", "Release Sticky Buttons", "(Reflow Port/Button or replace Daughterboard)"]
},
Ports: {
  details: ["DEF M/B AC Port","M/B AC Port don't charge the unit", "M/B AC Port only one side charge", "DEF M/B USB-A Port", "DEF D/B AC Port", "DEF D/B USB-A Port"],
  recommendations: ["Replace M/B", "Replace D/B", "Reflow DEF Port/s", "(Reflow DEF port and return the new M/B . Or Replace M/B)"]
},

LCD_NTS: {
  details: ["Cracked", "No Display issue", "No Backlights", "Lines on screen", "Flickering issue", "Missing"],
  recommendations: ["Replace LCD (NTS)"]
},
LCD_TouchScreen: {
  details: ["Cracked", "No Display issue", "Damaged Digitizer", "Touch not working", "No Backlights", "Lines on screen", "Flickering issue", "Missing"],
  recommendations: ["Replace LCD TouchScreen", "Replace Touch board"]
},
LCD_Cable: {
  details: ["Loose LCD cable", " Shorted/DMG LCD cable (NTS)", " Shorted/DMG LCD cable (TS)"],
  recommendations: ["Reseat LCD cable", "Replace LCD cable (NTS)", " Replace LCD cable (TS)"]
},
Keyboard: {
  details: ["Typing issue", "Missing key/keys", "Damaged key/keys", "Damaged", "Damaged Bezel", "Sticky keys", "Damaged cable", "Loose cable"],
  recommendations: ["Replace Keyboard", "Add missing keys", "Release sticky keys", "Reseat KB cable"]
},
Keyboard_WFC: {
  details: ["Typing issue", "Missing key/keys", "Damaged key/keys", "Damaged", "Damaged Bezel", "Sticky keys", "Damaged cable", "Loose cable"],
  recommendations: ["Replace Keyboard", "Add missing keys", "Release sticky keys", "Reseat KB cable"]
},
TouchPad: {
  details: ["Cursor don't move", "Won't click", "Sticky clicks", "Defective cable"],
  recommendations: ["Replace TP", "Replace TP cable", "Release sticky clicks"]
},
WebCam: {
  details: ["DMG Front CAM", "Front CAM not working", "Blurry Front CAM", "DMG Palmrest CAM", "Palmrest CAM not working", "Blurry Palmrest CAM", "Shorted CAM cable", "Loose CAM cable","Missing"],
  recommendations: ["Replace Front Camera", "Replace Palmrest Camera", "Repalce WebCam cable", "Reseat WebCam cable"]
},
Plastics: {
  details: ["DMG Bezel", "DMG Back cover", "DMG Back cover screw holders", "DMG Back cover hooks", "DMG Bottom cover", "DMG Palm-rest", "DMG Palm-rest Hinge screw holders", "DMG Palm-rest (WFC)", "DMG Palm-rest (WFC) Hinge screw holders", "DMG Hinges SPINE Strip", "Sticky Power Button plastic", "Missing Bezel Camera cover", "Scratch Bezel Camera cover", "Missing Palmrest Face Camera cover", "Missing Hinges Trim cover/cap"],
  recommendations: ["Replace Bezel", "Replace Back cover", "Replace Bottom cover", "Replace Palmrest", "Replace Palm-rest (WFC)", "Replace Hinges SPINE Strip", "Release Sticky Power Button plastic", "Replace Bezel Camera cover", "Replace Palmrest Face Camera cover", "Add UV skin", "Add Hinges Trim cover/cap"]
},
Hinges: {
  details: ["DMG R Hinge", "DMG L Hinge", "DMG Both Hinges","Loose Hinges", "Missing R Hinge cap", "Missing L Hinge cap", " Missing Both Hinges caps", "Missing Trim cover/cap"],
  recommendations: ["Replace R Hinge", "Replace L Hinge", "Replace Both Hinges", "Replace R Hinge cap", "Replace L Hinge cap", " Replace Both Hinges caps", "Add Hinges Trim cover/cap"]
},
Battery: {
  details: ["Won't Charge", "Fast Drain", " Loose cable"],
  recommendations: ["Replace Battery", "Reseat Battery cable"]
},
Liquid_Spill_Affected: {
  details: ["M/B", "D/B", "D/B cable", "Battery", "KB", "KB WFC", "TP", "Wifi Card", "LCD TS", "LCD NTS", "LCD cable (TS)", "LCD cable(NTS)"],
  recommendations: ["Replace M/B", "Replace D/B", "Replace D/B cable", "Replace Battery", "Replace KB", "Replace KB WFC", "Replace TP", "Replace Wifi Card", "Replace LCD TS", "Replace LCD NTS", "Replace LCD cable (TS)", "Replace LCD cable (NTS)"]
},
Wrong_Claim: {
  details: ["Screen is fine", " Keyboard is fine", " No Power issue found", " TouchPad is fine", " No Damage", " Unit charge w/out issue", "Battery working fine"],
  recommendations: [""]
},
NTF: {
  details: ["Screen is fine", " Keyboard is fine", " No Power issue found", "No freeze issue found", "No Auto Power-off issue found", " TouchPad is fine", " No Damage", " Unit charge w/out issue", "Battery working fine","Device working w/out issue"],
  recommendations: ["Contact Customer Service.", "Added Power Adapter", "Send back to the customer."]
},
High_Repair_Cost_DEF: {
  details: ["M/B", "D/B", "Screen", "KB", "TouchPad", "Back cover", " Bezel", " Bottom cover", "Palmrest", " Hinges", " Hinges cap", " Battery", " Wifi Card", " Webcam"],
  recommendations: ["Send a replacement unit due to the high cost of repair", "Send a replacement unit due to multiple previous repairs", "Replace DMG/DEF Parts or send a replacement unit"]
},
OS: {
  details: ["OS Missing", "OLD OS", "Need Powerwash"],
  recommendations: ["Reload OS", "Update OS", "Powerwash OS"]
},
Adapter: {
  details: ["Shorted wire", "DMG tip", "Missing cord"],
  recommendations: ["Replace ADP", "Add missing cord"]
},
Stylus: {
  details: ["DMG", "Missing"],
  recommendations: ["Replace Stylus", "Add Stylus"]
},
Wifi: {
  details: ["Missing Wifi Card", "DMG Wifi Card", " Loose Wifi Card", " Loose Wifi Card cables"],
  recommendations: ["Replace Wifi Card", "Reseat Wifi Card", "Reseat Wifi Card cables"]
},
Sensors: {
  details: ["Missing Accelerometer sensor", "Accelerometer sensor Defective", "DMG Accelerometer sensor", "Loose Accelerometer sensor cable"],
  recommendations: ["Replace Accelerometer sensor", "Reseat Accelerometer sensor cable"]
}                
};

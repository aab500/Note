import React from 'react';

function AccessoryButtons({ accessories, setAccessories, updateGeneratedText }) {
  const handleAccessoryToggle = (accessory) => {
    setAccessories(prev => {
      let newAccessories;
      if (accessory === 'None') {
        newAccessories = ['None'];
      } else {
        if (prev.includes('None')) {
          newAccessories = [accessory];
        } else {
          newAccessories = prev.includes(accessory)
            ? prev.filter(a => a !== accessory)
            : [...prev, accessory];
        }
        if (newAccessories.length === 0) {
          newAccessories = ['None'];
        }
      }
      updateGeneratedText('*Accessories', newAccessories.join(', '));
      return newAccessories;
    });
  };

  return (
    <div className="form-group">
      <div className="btn-group">
        {['None', 'ADP', 'Complete Case', 'Bottom Case', 'Back Case'].map(accessory => (
          <button
            key={accessory}
            className={`btn ${accessories.includes(accessory) ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => handleAccessoryToggle(accessory)}
          >
            {accessory}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AccessoryButtons;
import { useState } from 'react';
import './IconPicker.css';
import iconPaths from './icons.json';
import React from 'react';
import { styled } from '@mui/system';
import { Unstable_Popup as BasePopup } from '@mui/base';

function IconPicker({ rowsInOnePage, columnsInOnePage, iconHeight, iconWidth, pickerHeight, pickerWidth, setterFunction }) {
    const [anchor, setAnchor] = React.useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const iconsPerPage = rowsInOnePage * columnsInOnePage;
    const totalPages = Math.ceil(iconPaths.length / iconsPerPage);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    const getIconsForPage = (page) => {
        const startIndex = page * iconsPerPage;
        const endIndex = startIndex + iconsPerPage;
        return iconPaths.slice(startIndex, endIndex);
    };

    const handleIconClick = (iconPath) => {
        setterFunction({
            path: iconPath,
            iconHeight,
            iconWidth
        });
        setAnchor(false);
    };

    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
    };

    const iconsForCurrentPage = getIconsForPage(currentPage);

    return (
        <>
            <div>
                <div id='iconPicker' type="button" onClick={handleClick}>
                    Select Icon
                </div>
                <BasePopup id={id} open={open} anchor={anchor}>
                    <table style={{ backgroundColor: "white", borderRadius: "10px", margin: "10px", padding: "10px", paddingBottom: '100px', position: 'relative' }}>
                        <tbody>
                        {[...Array(rowsInOnePage)].map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {[...Array(columnsInOnePage)].map((_, colIndex) => {
                                        const iconIndex = rowIndex * columnsInOnePage + colIndex;
                                        const iconPath = iconsForCurrentPage[iconIndex];
                                        return (
                                            <td key={colIndex} style={{ margin: "10px", cursor: "pointer" }} onClick={() => handleIconClick(iconPath)}>
                                                {iconPath && <img id='iconPic' style={{ width: iconWidth, height: iconHeight }} src={iconPath} alt="icon" />}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', display: 'flex', alignItems: "center", justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
                            {currentPage > 0 && (
                                <svg style={{ backgroundColor: "#bafffe", padding: '8px', borderRadius: '100%', margin: '0px 10px', cursor: 'pointer' }} onClick={handlePrevPage} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                                    <path fill="black" d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281l360-281.1c3.8-3 6.1-7.7 6.1-12.6" />
                                </svg>
                            )}
                            <span style={{ color: 'black' }}>Page {currentPage + 1} of {totalPages}</span>
                            {currentPage < totalPages - 1 && (
                                <svg style={{ backgroundColor: "#bafffe", padding: '8px', borderRadius: '100%', margin: '0px 10px', cursor: 'pointer' }} onClick={handleNextPage} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                                    <path fill="black" d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1l-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4" />
                                </svg>
                            )}
                        </div>
                    </table>
                </BasePopup>
            </div>
        </>
    );
}

export default IconPicker;

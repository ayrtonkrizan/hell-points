import React, { useState } from "react";
import { functions } from "firebase-folder";
import { SearchContainer, PopperContainer } from "./styles";
import {
    CircularProgress,
    ClickAwayListener,
    InputBase,
    Popper
} from "@material-ui/core";
import SerachIcon from "@material-ui/icons/Search";
import Card from "components/itemCards/cart-card";

function Page() {
    const [tId, setTId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpened, setIsOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);

    const cancelTid = () => {
        clearTimeout(tId);
        setTId(null);
    }

    const getItems = async (searchText, ref) => {
        setLoading(true)
        try {
            const resp = await functions.searchItem({ searchText });
            setAnchorEl(ref);
            setIsOpened(true);
            setDataList(resp.data.list || []);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }

    }

    const handlerTyping = (evnt) => {
        if (evnt && evnt.target) {
            let value = evnt.target.value;
            let ref = evnt.currentTarget;
            if (tId)
                cancelTid();
            if (value && value.length >= 3) {
                let t = setTimeout(() => {
                    getItems(value, ref);
                }, 1000);

                setTId(t);
            }
        }
        else if (tId) {
            cancelTid();
            handleClosePopper();
        }
    }

    const handleClosePopper = () => {
        setAnchorEl(null);
        setIsOpened(false);
        setDataList([]);
    }

    const popperId = isOpened ? 'popper-items' : undefined;
    return (
        <>
            <SearchContainer elevation={3}>
                <InputBase
                    className="search-input"
                    placeholder="Pesquisar..."
                    onChange={handlerTyping}
                    endAdornment={loading ? <CircularProgress /> : <SerachIcon color="primary" />}
                />
            </SearchContainer>
            <ClickAwayListener onClickAway={handleClosePopper}>
                <Popper id={popperId} open={isOpened} anchorEl={anchorEl} style={{ zIndex: 1500 }}>
                    <PopperContainer elevation={3}>
                        {
                            dataList.map(itm => <Card key={itm.plu} initialData={itm} />)
                        }
                    </PopperContainer>
                </Popper>
            </ClickAwayListener>
        </>
    )
}
export default Page;
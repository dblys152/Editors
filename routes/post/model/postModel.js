/* 게시글 */
class PostForm {
    pstNo       = null;   //게시글번호
    #pstNo      = {value: null, dataType: "number", required: true};
    tpcCtgNo    = null;   //주제카테고리번호
    #tpcCtgNo   = {value: null, dataType: "string", required: true};
    pstTtl      = null;   //게시글제목
    #pstTtl     = {value: null, dataType: "string", required: true};
    pstCntn     = null;   //게시글내용
    #pstCntn    = {value: null, dataType: "string", required: true};
    pstDispCd   = null;   //게시글전시코드
    #pstDispCd  = {value: null, dataType: "string", required: true};
    topPstYn    = null;   //상단고정여부
    #topPstYn   = {value: null, dataType: "string", required: true};
    wrtMbrNo    = null;   //작성자회원번호
    #wrtMbrNo   = {value: null, dataType: "number", required: true};
    wrtDtt      = null;   //작성일시
    #wrtDtt     = {value: null, dataType: "string", required: true};
    viewCnt     = null;   //조회수
    #viewCnt    = {value: null, dataType: "number", required: true};
    cmntYn      = null;   //댓글가능여부
    #cmntYn     = {value: null, dataType: "string", required: true};
    rcmYn       = null;   //추천가능여부
    #rcmYn      = {value: null, dataType: "string", required: true};
    pstStDtt    = null;   //게시시작일시
    #pstStDtt   = {value: null, dataType: "string", required: false};
    pstEdDtt    = null;   //게시종료일시
    #pstEdDtt   = {value: null, dataType: "string", required: false};
    regNo       = null;   //등록자
    #regNo      = {value: null, dataType: "string", required: true};
    regDtt      = null;   //등록일시
    #regDtt     = {value: null, dataType: "string", required: true};
    modNo       = null;   //수정자
    #modNo      = {value: null, dataType: "string", required: true};
    modDtt      = null;   //수정일시
    #modDtt     = {value: null, dataType: "string", required: true};
    tagSeq      = null;   //태그순번
    #tagSeq     = {value: null, dataType: "number", required: true};
    tagNm       = null;   //태그명
    #tagNm      = {value: null, dataType: "string", required: true};

    constructor() {}

    static typeCheck = (thisParam, param, paramNm) => {
        let orgParam = param;
        if(param != null && typeof param == 'string') {             //공백 NULL 처리
            param = (param.trim() == '' ? null : param.trim());
        }
        if(param != null && thisParam.dataType == 'number') {       //body 이외는 다 string 이므로 형변환 필요
            if(!isNaN(parseInt(param))) param = parseInt(param);
        }
        try {
            if(thisParam.required && param != null && typeof param == thisParam.dataType) {
                thisParam.value = param;
            } else if ((!thisParam.required && param == null) || typeof param == thisParam.dataType) {
                thisParam.value = (param == null ? null : param);
            } else {
                throw {status: 400, message:"Data type error : " + paramNm + " / " + orgParam};
            }
        } catch(err) {
            throw err;
        }
    }

    setPstNo(pstNo) { PostForm.typeCheck(this.#pstNo, pstNo, "pstNo"); this.pstNo = this.#pstNo.value; }
    setTpcCtgNo(tpcCtgNo) { PostForm.typeCheck(this.#tpcCtgNo, tpcCtgNo, "tpcCtgNo"); this.tpcCtgNo = this.#tpcCtgNo.value; }
    setPstTtl(pstTtl) { PostForm.typeCheck(this.#pstTtl, pstTtl, "pstTtl"); this.pstTtl = this.#pstTtl.value; }
    setPstCntn(pstCntn) { PostForm.typeCheck(this.#pstCntn, pstCntn, "pstCntn"); this.pstCntn = this.#pstCntn.value; }
    setPstDispCd(pstDispCd) { PostForm.typeCheck(this.#pstDispCd, pstDispCd, "pstDispCd"); this.pstDispCd = this.#pstDispCd.value; }
    setTopPstYn(topPstYn) { PostForm.typeCheck(this.#topPstYn, topPstYn, "topPstYn"); this.topPstYn = this.#topPstYn.value; }
    setWrtMbrNo(wrtMbrNo) { PostForm.typeCheck(this.#wrtMbrNo, wrtMbrNo, "wrtMbrNo"); this.wrtMbrNo = this.#wrtMbrNo.value; }
    setWrtDtt(wrtDtt) { PostForm.typeCheck(this.#wrtDtt, wrtDtt, "wrtDtt"); this.wrtDtt = this.#wrtDtt.value; }
    setViewCnt(viewCnt) { PostForm.typeCheck(this.#viewCnt, viewCnt, "viewCnt"); this.viewCnt = this.#viewCnt.value; }
    setCmntYn(cmntYn) { PostForm.typeCheck(this.#cmntYn, cmntYn, "cmntYn"); this.cmntYn = this.#cmntYn.value; }
    setRcmYn(rcmYn) { PostForm.typeCheck(this.#rcmYn, rcmYn, "rcmYn"); this.rcmYn = this.#rcmYn.value; }
    setPstStDtt(pstStDtt) { PostForm.typeCheck(this.#pstStDtt, pstStDtt, "pstStDtt"); this.pstStDtt = this.#pstStDtt.value; }
    setPstEdDtt(pstEdDtt) { PostForm.typeCheck(this.#pstEdDtt, pstEdDtt, "pstEdDtt"); this.pstEdDtt = this.#pstEdDtt.value; }
    setRegNo(regNo) { PostForm.typeCheck(this.#regNo, regNo, "regNo"); this.regNo = this.#regNo.value; }
    setRegDtt(regDtt) { PostForm.typeCheck(this.#regDtt, regDtt, "regDtt"); this.regDtt = this.#regDtt.value; }
    setModNo(modNo) { PostForm.typeCheck(this.#modNo, modNo, "modNo"); this.modNo = this.#modNo.value; }
    setModDtt(modDtt) { PostForm.typeCheck(this.#modDtt, modDtt, "modDtt"); this.modDtt = this.#modDtt.value; }
    setTagSeq(tagSeq) { tagForm.typeCheck(this.#tagSeq, tagSeq, "tagSeq"); this.tagSeq = this.#tagSeq.value; }
    setTagNm(tagNm) { tagForm.typeCheck(this.#tagNm, tagNm, "tagNm"); this.tagNm = this.#tagNm.value; }
}

module.exports = { PostForm };
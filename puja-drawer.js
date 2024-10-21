import React, { useEffect, useState } from "react";
import { Drawer, Input, Spin, message } from "antd";
import MyButton from "../ui/button.js";
import { updatePooja } from "../api/puja-api.js";
import { createPooja } from "../api/puja-api.js";
import { Button, Modal } from "antd";

import PoojaModalAdd from "./PoojaModalAdd.js";
const { TextArea } = Input;

const PujaDrawer = ({
  openDrawer,
  closeDrawer,
  refreshTable,
  drawerData,
  action,
}) => {
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // State Variables
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");
  const [poojaTag, setPoojaTag] = useState("");
  const [poojaDuration, setPoojaDuration] = useState(0);
  const [tithi, setTithi] = useState("");
  const [aboutPooja, setAboutPooja] = useState("");

  const [category, setCategory] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [index, setIndex] = useState(0);
  const [panditNo, setPanditNo] = useState(0);
  const [faq, setFaq] = useState([{ title: "", descriptions: "", index: 0 }]);
  const [poojaBookPdf, setPoojaBookPdf] = useState([
    { title: "", pdfUrl: "", index: 0 },
  ]);
  const [poojaBlog, setPoojaBlog] = useState([
    { title: "", pageUrl: "", thumbnail: "", index: 0 },
  ]);
  // const [poojaBookPdf, setPoojaBookPdf] = useState([]);
  // const [poojaBlog, setPoojaBlog] = useState([]);
  const [newFaq, setNewFaq] = useState([]);
  const [newFaqTitle, setNewFaqTitle] = useState("");
  const [newFaqDis, setNewFaqDis] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[faqTitle, setFaqTitle]= useState()
  const[faqDescription, setFaqDescription]= useState("");
  const[faqIndex, setFaqIndex]= useState("");
  const[pdfTitle, setPdfTitle]= useState("");
  const[pdfUrl, setPdfUrl]=  useState("");
  const[pdfIndex, setPdfIndex]= useState("");
  const[deleter, setDeleter]= useState("");

  useEffect(() => {
    if (drawerData) {
      // Set data in form when the drawer opens for edit or view
      setTitle(drawerData.title || "");
      setSubtitle(drawerData.subtitle || "");
      setDate(drawerData.date || "");
      setPoojaTag(drawerData.poojaTag || "");
      setTithi(drawerData.tithi || "");
      setAboutPooja(drawerData.aboutPooja || "");
      setPoojaDuration(drawerData.poojaDuration || 0);
      setCategory(drawerData.category || []);
      setVisibility(drawerData.visibility || false);
      setIndex(drawerData.index || 0);
      setPanditNo(drawerData.panditNo || 0);
      setFaq(drawerData.faq || [{ title: "", descriptions: "", index: 0 }]);
      setPoojaBookPdf(
        drawerData.poojaBookPdf || [{ title: "", pdfUrl: "", index: 0 }]
      );
      setPoojaBlog(
        drawerData.poojaBlog || [
          { title: "", pageUrl: "", thumbnail: "", index: 0 },
        ]
      );
      setIsUpdating(action === "Edit");
      setNewFaqTitle(drawerData.faq || "");
      setNewFaqDis(drawerData.faq || "");
    }
  }, [drawerData]);

  const validateForm = () => {
    if (!title.trim()) return "Title is required.";
    if (!subtitle.trim()) return "Subtitle is required.";

    if (!poojaTag.trim()) return "Pooja tag is required.";
    if (poojaDuration <= 0) return "Pooja duration must be greater than 0.";
    if (!aboutPooja.trim()) return "About Pooja is required.";
    return null;
  };

  const formData = {
    title,
    subtitle,
    date,
    poojaTag,
    poojaDuration,
    tithi,
    aboutPooja,
    category,
    visibility,
    index,
    panditNo,
    faq,
    poojaBookPdf,
    poojaBlog,
    newFaqTitle,
    newFaqDis,
  };

  const resetDrawer = () => {
    closeDrawer();
    setIsUpdating(false);
    setTitle("");
    setSubtitle("");
    setDate("");
    setPoojaTag("");
    setPoojaDuration(0);
    setTithi("");
    setAboutPooja("");
    setCategory([]);
    setVisibility(false);
    setIndex(0);
    setPanditNo(0);
    setFaq([{ title: "", descriptions: "", index: 0 }]);
    setPoojaBookPdf([{ title: "", pdfUrl: "", index: 0 }]);
    setPoojaBlog([{ title: "", pageUrl: "", thumbnail: "", index: 0 }]);
    setNewFaqTitle("");
    setNewFaqDis("");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  
  const handleSubmit = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      message.error(errorMessage);
      return;
    }

    setLoading(true);
    setIsModalOpen(false);
    try {
      const formData = { faq };
      if (isUpdating) {
        await updatePooja(drawerData._id, formData);
        message.success("Pooja updated successfully!");
      } else {
        await createPooja(formData);
        message.success("Pooja created successfully!");
      }

      resetDrawer();
      refreshTable();
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFaqSubmit = async () => {
    const newFaq = { title: faqTitle, descriptions: faqDescription, index: faqIndex };
    setFaq([...faq, newFaq]); 
    // resetDrawer(); 
    setIsModalOpen(false);
    // showModal();
    // onCancel
    

  };
  const handlePoojaBookPdfSubmit = async () => {
    const newPoojaBookPdf = { title: pdfTitle, pdfUrl: pdfUrl, index: pdfIndex };
    setFaq([...poojaBookPdf, newPoojaBookPdf]); 
    // resetDrawer(); 
    setIsModalOpen(false);
    // showModal();
    // onCancel
    

  };

  

  const handleDeleteFaq=async (deletePooja, faq)=>{
    // alert(index.title);
    const f = faq.filter((data)=> data !== deletePooja);
    setFaq(f);
    

  }
  const handleDeletePdf =async(deletePooja, poojaBookPdf)=>{
    const f = poojaBookPdf.filter((data)=> data !== deletePooja); 
    setPoojaBookPdf(f)
  }
  const handleDeleteBlog =async(deletePooja, poojaBlog)=>{
    const f = poojaBlog.filter((data)=> data !== deletePooja); 
    setPoojaBlog(f)
  }
  

  const isReadOnly = action === "View";

  return (
    
    <Drawer
      title={
        isUpdating
          ? "Update Pooja"
          : action === "View"
          ? "View Pooja"
          : "Add New Pooja"
      }
      onClose={resetDrawer}
      open={openDrawer}
      maskClosable={false}
      width={800}
    >
      <Spin spinning={loading}>
        <div>
{/*        
        <PoojaModalAdd/> */}
           
          <p className="py-4">Title</p>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">Subtitle</p>
          <Input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">Date</p>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">Pooja Tag</p>
          <Input
            value={poojaTag}
            onChange={(e) => setPoojaTag(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">Pooja Duration (in hours)</p>
          <Input
            type="number"
            value={poojaDuration}
            onChange={(e) => setPoojaDuration(Number(e.target.value))}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">About Pooja</p>
          <TextArea
            rows={4}
            value={aboutPooja}
            onChange={(e) => setAboutPooja(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <div className="bg-gray-500 my-2 text-white py-4 flex justify-between px-2">
            <p >FAQ</p>
            {action !== "View" && (
              <Button type="primary" className="bg-white text-gray-700 hover:bg-gray-500 shadow-lg" onClick={showModal}>
                Add new
              </Button>
            )}
            
             <Modal
          title="Add New FAQ"
          open={isModalOpen}
          onOk={handleFaqSubmit}
          onCancel={() => setIsModalOpen(false)}
        >
          
          <Input
            placeholder="Title"
            value={faqTitle}
            onChange={(e) => setFaqTitle(e.target.value)}
            className="my-2"
          />
          <Input
            placeholder="Index"
            value={faqIndex}
            onChange={(e) => setFaqIndex(Number(e.target.value))}
            className="my-2"
          />
          <TextArea
            placeholder="Description"
            value={faqDescription}
            onChange={(e) => setFaqDescription(e.target.value)}
            className="my-2"
          />
        </Modal>
          </div>
         

         
          {faq.map((item, index) => (
            <div key={index}>
              <Input
                placeholder="index"
                value={item.index}
                onChange={(e) =>
                  setFaq(
                    faq.map((f, i) =>
                      i === index ? { ...f, index: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  setFaq(
                    faq.map((f, i) =>
                      i === index ? { ...f, title: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
            
              <TextArea
                placeholder="Description"
                value={item.descriptions}
                onChange={(e) =>
                  setFaq(
                    faq.map((f, i) =>
                      i === index ? { ...f, descriptions: e.target.value } : f
                    )
                  )
                }
              />
              {action=="Edit" &&  <button className="justify-end text-white border-solid border-2 rounded-lg p-2 mb-5 mt-2 w-24 bg-slate-500" 
                onClick={(()=>handleDeleteFaq(item, faq))}>Delete</button>}
               
            </div>
          ))}


<div>

<div className="bg-gray-500 my-2 text-white py-4 flex justify-between px-2">
<p >Pooja Book Pdf</p>
            {action !== "View" && (
              <Button type="primary" className="bg-white text-gray-700 hover:bg-gray-500 shadow-lg" onClick={showModal}>
                Add new
              </Button>
            )}

</div>
          {poojaBookPdf.map((item, index) => (
            <div key={index}>
               <Input
                placeholder="index"
                value={item.index}
                onChange={(e) =>
                  setPoojaBookPdf(
                    poojaBookPdf.map((f, i) =>
                      i === index ? { ...f, index: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  setPoojaBookPdf(
                    poojaBookPdf.map((f, i) =>
                      i === index ? { ...f, title: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
             
              <TextArea
                placeholder="PdfUrl"
                value={item.pdfUrl}
                onChange={(e) =>
                  setPoojaBookPdf(
                    poojaBookPdf.map((f, i) =>
                      i === index ? { ...f, pdfUrl: e.target.value } : f
                    )
                  )
                }
              />
              {action="Edit" &&   <button className="justify-end text-white border-solid border-2 rounded-lg p-2 mb-5 mt-2 w-24 bg-slate-500" 
                onClick={(()=>handleDeletePdf(item, poojaBookPdf ))}>Delete</button>}
             
            </div>
          ))}
         </div> 

         <div className="bg-gray-500 my-2 text-white py-4 flex justify-between px-2">


            <p >Pooja Blog</p>
            {action !== "View" && (
              <Button type="primary" className="bg-white text-gray-700 hover:bg-gray-500 shadow-lg" onClick={showModal}>
                Add new
              </Button>
            )}
            </div>
          {poojaBlog.map((item, index) => (
            <div key={index}>
             
             {console.log("kshs",item)}
              <Input
                placeholder="index"
                value={item.index}
                onChange={(e) =>
                  setPoojaBlog(
                    poojaBlog.map((f, i) =>
                      i === index ? { ...f, index: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
               <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  setPoojaBlog(
                    poojaBlog.map((f, i) =>
                      i === index ? { ...f, title: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
              <TextArea
                placeholder="PageUrl"
                value={item.pageUrl}
                onChange={(e) =>
                  setPoojaBlog(
                    poojaBlog.map((f, i) =>
                      i === index ? { ...f, pageUrl: e.target.value } : f
                    )
                  )
                }
              />
              <Input
                placeholder="Thumbnail"
                value={item.thumbnail}
                onChange={(e) =>
                  setPoojaBlog( 
                    poojaBlog.map((f, i) =>
                      i === index ? { ...f, thumbnail: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
             {action="Edit" &&   <button className="justify-end text-white border-solid border-2 rounded-lg p-2 mb-5 mt-2 w-24 bg-slate-500" 
                onClick={(()=>handleDeleteBlog(item, poojaBlog))}>Delete</button>}
            </div>
          ))}
        </div>

        {action !== "View" && (
          <div style={{ marginTop: "30px" }}>
            <MyButton
              title={isUpdating ? "Update" : "Submit"}
              action={handleSubmit}
            />
          </div>
        )}

       
      </Spin>
    </Drawer>
  );
};

export default PujaDrawer;

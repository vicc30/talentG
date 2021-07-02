import PropTypes from "prop-types";
import { useState } from "react";

import TopicList from "./TopicList";
import ResourcesList from "./ResourcesList";
import ModalContainer from "../../ModalContainer/ModalContainer";
import EditModalBody from "../../EditAgendaByDay/EditModalBody";
import DailyImage from "../../img/daily-class-1.png";
import optionsImg from "../../img/options.png";

import "./dailyClass.css";

export default function DailyClass({
  isTrainer,
  dailyScheduleData,
  dailyImage,
  trainers,
}) {
  const [resources] = useState(dailyScheduleData.resourceDTOList);
  console.log(dailyScheduleData);
  const [trainer] = useState(
    `${dailyScheduleData.trainerDTO.firstName} ${dailyScheduleData.trainerDTO.lastName}`
  );
  const [showEdit, setShowEdit] = useState(false);
  const [showTrainer, setShowTrainer] = useState(false);
  const topicsTitle = "Aprenderemos los conceptos core sobre CSS:";
  const [showEditButton, setShowEditButton] = useState(false);

  function toggleEdit() {
    setShowEdit(!showEdit);
  }

  function toggleTrainer() {
    setShowTrainer(() => !showTrainer);
  }

  function showButton() {
    setShowEditButton(!showEditButton);
  }

  return (
    <>
      <section className="dailyClass">
        <div className="dailyClass__contentLeft">
          <h1 className="dailyClass__title">
            Día {dailyScheduleData.day} - {dailyScheduleData.topic}
          </h1>
          <div className="dailyClass__topics">
            <TopicList
              summary={dailyScheduleData.summary}
              topicsTitle={topicsTitle}
            ></TopicList>
          </div>
          <div className="dailyClass__resources">
            <ResourcesList resources={resources}></ResourcesList>
          </div>
        </div>
        <div className="dailyClass__contentRigth">
          <figure className="dailyClass__figure">
            <img
              className="dailyClass__image"
              src={DailyImage}
              alt={dailyImage.alt}
            ></img>
            <figcaption hidden>{dailyImage.caption}</figcaption>
          </figure>
          <p className="dailyClass__trainer" onClick={toggleTrainer}>
            Trainer: {trainer}
          </p>
        </div>
        {isTrainer && (
          <>
            <button className="dailyClass__options" onClick={showButton}>
              <img src={optionsImg} alt="" />
            </button>
            <button className={showEditButton ? 'dailyClass__edit' : 'dailyClass__edit--hidden'} onClick={toggleEdit}>
              Editar
            </button>
          </>
        )}
      </section>
      {isTrainer && (
        <>
          <ModalContainer
            children={
              <EditModalBody
                day={dailyScheduleData.day}
                topicTitle={dailyScheduleData.topic}
                summary={dailyScheduleData.summary}
                trainers={trainers}
              />
            }
            show={showEdit}
            handleClose={()=> {
              toggleEdit();
              showButton();
            }}
            handlePrimary={() => alert("clicked send Daily class edit")}
            primaryBtnName={"Guardar"}
            secondaryBtnName={"Cerrar"}
          />
        </>
      )}
      <ModalContainer show={showTrainer} handleClose={toggleTrainer} />
    </>
  );
}

DailyClass.propTypes = {
  isTrainer: PropTypes.bool,
  dailyScheduleData: PropTypes.object,
  dailyImage: PropTypes.object,
  trainers: PropTypes.array,
}

DailyClass.defaultProps = {
  isTrainer: false,
  dailyScheduleData: {
    date: "28-06-21",
    day: 1,
    id: 1,
    id_Trainer: 1,
    id_training: 1,
    summary: "Some summary",
    topic: "CSS",
    trainerDTO: {
      firstName: "Miguel",
      lastName: "Romero",
    },
  },
  dailyImage: {
    src: "/assets/img/daily-class-1.png",
    alt: "Day 1 Bootcamp:CSS",
    caption: "UI Engineering Studio. Day 1. Bootcamp:CSS",
  },
  trainers: ["Miguel Romero", "Juan Crisóstomo", "Angel Pantoja"],
};

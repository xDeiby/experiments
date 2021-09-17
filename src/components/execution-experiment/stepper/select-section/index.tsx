import { useSelector } from 'react-redux';
import { ETypeSection } from '../../../../model/experiment/enum-types';
import { IFormElements } from '../../../../model/experiment/IExecutionExperiment';
import { ApplicationState } from '../../../../store';

export function SectionSelect() {
    const sectionElements = useSelector((state: ApplicationState) => {
        const section = state.section_steps.data;
        const experiment = state.execution_experiment.data;

        if (section.type === ETypeSection.SURVEY)
            return experiment.surveys.find(
                (el) => el.section.id === section.id
            );
        else
            return experiment.quizzes.find(
                (el) => el.section.id === section.id
            );
    }) as IFormElements;

    const allSections = useSelector((state: ApplicationState) => {
        const experiment = state.execution_experiment.data;
        return [...experiment.surveys, ...experiment.quizzes];
    });
    return { sectionElements, allSections };
}

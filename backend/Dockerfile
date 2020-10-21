FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code

ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/

RUN echo 'alias manage="python manage.py"' >> ~/.bashrc

RUN adduser --disabled-password --gecos '' django
RUN groupadd docker
RUN usermod -aG docker django

RUN mkdir ~/scripts/
RUN chown -R django:django ~/
RUN chown -R django:django ~/scripts/
RUN chown -R django:django /code/

ADD entrypoint.sh /home/django/scripts/
RUN ["chmod", "+x", "/home/django/scripts/entrypoint.sh"]
ENTRYPOINT ["/home/django/scripts/entrypoint.sh"]

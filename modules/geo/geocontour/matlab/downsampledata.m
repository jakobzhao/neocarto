%% Constants
OFFSET = 100;
FNAME = 'C:\tmp\hood.tif';

%% Download and Resize
hood = importdata(FNAME);
[m,n]=size(hood);
X = hood(1+OFFSET:m-OFFSET,1+OFFSET:n-OFFSET);
sX = imresize(X,[100,100]);

%% Export Data as 100x100 Json
fid = fopen('../assets/mthood.json','w+t');
fprintf(fid,'{"width":100,"height":100,"values":[');
fprintf(fid,'%.1f,',sX(1:end-1));
fprintf(fid,'%.1f]}',sX(end));
fclose(fid);

%% Get X and Y coords
[a,b,c] = geotiffread(FNAME);
[x,y,zone]=deg2utm(c(:,2),c(:,1));

xi = linspace(x(1),x(2),m);
yi = linspace(y(1),y(2),n);

xis = xi(1+OFFSET:m-OFFSET);
yis = yi(1+OFFSET:m-OFFSET);

fprintf('var xi = [%.2f, %.2f];\n',xis(1)/1000,xis(end)/1000);
fprintf('var yi = [%.2f, %.2f];\n',yis(1)/1000,yis(end)/1000);

%% Plot Data
figure(1);clf
subplot(2,1,1);
imagesc(X);
hold on
contour(X,20,'k');
axis equal

subplot(2,1,2);
imagesc(sX);
hold on
contour(sX,20,'k');
axis equal
